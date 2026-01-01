package com.You.Tube.Tools.Controller;

import com.You.Tube.Tools.Model.VideoDetails;
import com.You.Tube.Tools.Service.ThumbnailService;
import com.You.Tube.Tools.Service.YouTubeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/youtube")
@RequiredArgsConstructor
public class YouTubeVideoController {

    private final YouTubeService youTubeService;
    private final ThumbnailService service;

    @PostMapping("/video-details")
    public ResponseEntity<?> fetchVideoDetails(@RequestParam String videoUrlOrId) {
        String videoId = service.extractVideoId(videoUrlOrId);

        if (videoId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid YouTube URL or ID"));
        }

        VideoDetails details = youTubeService.getVideoDetails(videoId);

        if (details == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Video details not found"));
        }

        return ResponseEntity.ok(details);
    }
}