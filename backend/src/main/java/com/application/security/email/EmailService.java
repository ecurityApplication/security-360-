package com.application.security.email;

import com.application.security.dto.EmailDetails;
import com.application.security.exception.MailException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
@RequiredArgsConstructor
public class EmailService implements EmailSender{

    private final static Logger LOGGER = LoggerFactory
            .getLogger(EmailService.class);

    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String sender;
    @Override
    @Async
    public void send(String to, String email, String emailBody, String filePath) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject("Confirm your email");
            helper.setFrom("hello@amigoscode.com");
            helper.setText( emailBody,true );
            // Decode Base64 image data
            byte[] decodedImage = Base64.getDecoder().decode(filePath.split(",")[1]);
            ByteArrayResource byteArrayResource = new ByteArrayResource(decodedImage);
            helper.addAttachment("qr_code.png", byteArrayResource);

            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }
    public String sendSimpleMail(EmailDetails emailDetails) {


        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            //Java mail sender takes an argument of type SimpleMailMessage only


            mailMessage.setFrom(sender);
            mailMessage.setTo(emailDetails.getTo());
            mailMessage.setSubject(emailDetails.getSubject());
            mailMessage.setText(emailDetails.getMessageBody());


            mailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }
        catch (MailException e) {
            throw new MailException("erreur") {
            };
        }


    }

}
