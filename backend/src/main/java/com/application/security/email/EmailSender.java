package com.application.security.email;

public interface EmailSender {
   //void send(String to, String email, String emailBody);
    void send(String to, String email, String emailBody, String filePath) ;

}
