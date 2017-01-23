<?php

namespace Recca0120\Terminal;

use Exception;
use Throwable;
use Illuminate\Http\Request;
use Illuminate\Console\Command;
use Symfony\Component\Console\Input\StringInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Formatter\OutputFormatter;
use Illuminate\Console\Application as ConsoleApplication;
use Symfony\Component\Debug\Exception\FatalThrowableError;

class Application extends ConsoleApplication
{
    /**
     * Run an Artisan console command by name.
     *
     * @param string $command
     * @param array  $parameters
     *
     * @return int
     */
    public function call($command, array $parameters = [])
    {
        $this->lastOutput = $this->getBufferedOutput();

        $this->setCatchExceptions(false);

        $command = $command.''.implode(' ', $parameters);
        $input = new StringInput($command);
        $input->setInteractive(false);
        $result = $this->run($input, $this->lastOutput);

        $this->setCatchExceptions(true);

        return $result;
    }

    /**
     * Resolve an array of commands through the application.
     *
     * @param array|mixed $commands
     * @param bool $web
     *
     * @return $this
     */
    public function resolveCommands($commands, $web = false)
    {
        if ($web === false) {
            return;
        }

        return parent::resolveCommands($commands);
    }

    /**
     * Runs the current application.
     *
     * @param InputInterface  $input  An Input instance
     * @param OutputInterface $output An Output instance
     *
     * @throws \Exception When doRun returns Exception
     *
     * @return int 0 if everything went fine, or an error code
     */
    public function run(InputInterface $input = null, OutputInterface $output = null)
    {
        try {
            return parent::run($input, $output);
        } catch (Exception $e) {
            if ($this->isAjax() === false) {
                throw $e;
            }

            while ($prevException = $e->getPrevious()) {
                $e = $prevException;
            }

            $this->renderException($e, $output);

            return 1;
        } catch (Throwable $e) {
            if ($this->isAjax() === false) {
                throw $e;
            }
            $e = new FatalThrowableError($e);
            $this->renderException($e, $output);

            return 1;
        }
    }

    /**
     * getBufferedOutput.
     *
     * @method getBufferedOutput
     *
     * @return \Symfony\Component\Console\Output\BufferedOutput
     */
    private function getBufferedOutput()
    {
        if ($this->isAjax() === true) {
            return new BufferedOutput(BufferedOutput::VERBOSITY_NORMAL, true, new OutputFormatter(true));
        }

        return new BufferedOutput();
    }

    /**
     * isAjax.
     *
     * @method isAjax
     *
     * @return bool
     */
    private function isAjax()
    {
        if (is_null($this->laravel['request']) === false) {
            return $this->laravel['request']->ajax();
        }

        return Request::capture()->ajax();
    }
}
