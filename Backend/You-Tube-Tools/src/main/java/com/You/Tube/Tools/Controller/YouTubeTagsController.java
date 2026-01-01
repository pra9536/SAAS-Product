package com.You.Tube.Tools.Controller;

import com.You.Tube.Tools.Model.SearchVideo;
import com.You.Tube.Tools.Service.YouTubeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/youtube")
public class YouTubeTagsController {

    @Autowired
    private YouTubeService youTubeService;

    @Value("${youtube.api.key}")
    private String apiKey;

    @PostMapping("/search")
    public ResponseEntity<?> videoTags(@RequestParam("videoTitle") String videoTitle) {
        if (apiKey == null || apiKey.isEmpty()) {
            return ResponseEntity.internalServerError().body(Map.of("error", "API key not configured"));
        }
        try {
            SearchVideo result = youTubeService.searchVideos(videoTitle);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
}