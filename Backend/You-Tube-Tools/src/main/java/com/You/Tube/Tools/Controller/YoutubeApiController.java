package com.You.Tube.Tools.Controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class YoutubeApiController {

    @PostMapping("/search")
    public Map<String, Object> searchTags(@RequestParam String videoTitle) {

        return Map.of(
                "primaryVideo", Map.of(
                        "title", videoTitle,
                        "tags", new String[]{"Java", "Spring", "React"}
                )
        );
    }
}