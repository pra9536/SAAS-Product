package com.You.Tube.Tools.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {


    @GetMapping({"/", "/home", "/thumbnail", "/video-details"})
    public String redirect() {
        return "forward:/index.html";
    }
}