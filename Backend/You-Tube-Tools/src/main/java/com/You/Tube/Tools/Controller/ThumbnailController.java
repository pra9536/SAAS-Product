package com.You.Tube.Tools.Controller;

import com.You.Tube.Tools.Service.ThumbnailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
public class ThumbnailController {

    @Autowired
    ThumbnailService service;

    @PostMapping("/get-thumbnail")
    public ResponseEntity<?> showThumbnail(@RequestParam("videoUrlOrId") String videoUrlOrId) {
        String videoId = service.extractVideoId(videoUrlOrId);
        if (videoId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid YouTube URL"));
        }
        String thumbnailUrl = "https://img.youtube.com/vi/" + videoId + "/maxresdefault.jpg";
        return ResponseEntity.ok(Map.of("thumbnailUrl", thumbnailUrl));
    }
}