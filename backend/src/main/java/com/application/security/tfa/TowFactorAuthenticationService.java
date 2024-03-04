package com.application.security.tfa;

import dev.samstevens.totp.code.*;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.DefaultSecretGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import dev.samstevens.totp.time.TimeProvider;
import dev.samstevens.totp.util.Utils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import static dev.samstevens.totp.util.Utils.getDataUriForImage;

@Service
@Slf4j
public class TowFactorAuthenticationService {

    //method that generate secret code to the user
    public String generateNewSecret() {
        return new DefaultSecretGenerator().generate();//generate secret token
    }

    ////method that generate a QR code image Uri
    public String generateQrCodeImgUri(String secret) {
        QrData data = new QrData.Builder()
                .label("Security 360")
                .secret(secret)
                .issuer("2FA-security")
                .algorithm( HashingAlgorithm.SHA1)// hash the pwd
                .digits(6)
                .period(30)//how long  this code should be valid(30 secondes)
                .build();

        QrGenerator generator = new ZxingPngQrGenerator();
        byte[] imageData = new byte[0];//create an image //the array to store the generated Qr code
        try {
            imageData = generator.generate(data);
        } catch (QrGenerationException e) {
            e.printStackTrace();//to see the exception in local execution
            log.error("Error while generating QR-CODE");
        }
        return getDataUriForImage(imageData, generator.getImageMimeType());
    }

    //method that should validate ou otp
    public boolean isOtpValid(String secret, String code) {
        TimeProvider timeProvider = new SystemTimeProvider();
        CodeGenerator codeGenerator = new DefaultCodeGenerator();
        CodeVerifier verifier =  new DefaultCodeVerifier(codeGenerator,timeProvider);
        return verifier.isValidCode(secret, code );
    }

    public boolean isOtpNotValid(String secret, String code) {
        return !this.isOtpValid(secret, code );
    }
}
