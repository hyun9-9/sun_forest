package com.sun_forest.sun_forest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
@SpringBootApplication
public class SunForestApplication {

	public static void main(String[] args) {
		SpringApplication.run(SunForestApplication.class, args);
	}

}

@RestController
class Helloworld {
        @GetMapping("/")
        public String greet() {
                return "Hello!";
        }
}
