<?php

namespace App\Exceptions;

use \Exception;

class RequestError extends Exception
{
    public function __construct($message = "Unable to execute operation")
    {
        $message = $message;    
        parent::__construct($message);
    }    
}
