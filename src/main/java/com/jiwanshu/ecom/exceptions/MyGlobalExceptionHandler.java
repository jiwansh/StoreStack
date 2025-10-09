package com.jiwanshu.ecom.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class MyGlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String,String>> myMethodArgumentNotValidException(MethodArgumentNotValidException e){
        Map<String,String> response = new HashMap<>();
   e.getBindingResult().getAllErrors().forEach(err->{
       String FieldName = ((FieldError)err).getField();
       String message = ((FieldError)err).getDefaultMessage();
       response.put(FieldName,message);
   });
   return new ResponseEntity<Map<String,String>>(response, HttpStatus.BAD_REQUEST) ;
  }
}
