    package com.You.Tube.Tools.Service;


    import com.You.Tube.Tools.DTOs.*;
    import com.You.Tube.Tools.Model.SearchVideo;
    import com.You.Tube.Tools.Model.Video;
    import com.You.Tube.Tools.Model.VideoDetails;
    import com.You.Tube.Tools.DTOs.Snippet;
    import lombok.Data;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.beans.factory.annotation.Value;
    import org.springframework.stereotype.Service;
    import org.springframework.web.reactive.function.client.WebClient;

    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.Collections;
    import java.util.List;

    @Service
    public class YouTubeService {

        private final WebClient webClient; // Change this from Builder to WebClient
        private final String apiKey;
        private final String baseUrl;
        private final int maxRelatedVideos;

        @Autowired
        public YouTubeService(WebClient.Builder builder,
                              @Value("${youtube.api.key}") String apiKey,
                              @Value("${youtube.api.base.url}") String baseUrl, @Value("${youtube.api.max.related.videos}") int maxRelatedVideos) {
            this.apiKey = apiKey;
            this.baseUrl = baseUrl;
            this.maxRelatedVideos = maxRelatedVideos;
            // Build it once here
            this.webClient = builder.baseUrl(baseUrl).build();
        }

        public SearchVideo searchVideos(String videoTitle){
            List<String> videoIds = searchForVideoIds(videoTitle);

            if(videoIds.isEmpty()){
                return SearchVideo.builder()
                        .primaryVideo(null)
                        .relatedVideos(Collections.emptyList())
                        .build();
            }

            String primaryVideoId = videoIds.get(0);
            List<String> relatedVideoIds = videoIds.subList(1, Math.min(videoIds.size(), maxRelatedVideos + 1));

            Video primaryVideo = getVideoById(primaryVideoId);

            List<Video> relatedVideos = new ArrayList<>();

            for(String id : relatedVideoIds){
                Video video = getVideoById(id);
                if(video!=null){
                    relatedVideos.add(video);
                }
            }


            return SearchVideo.builder()
                    .primaryVideo(primaryVideo)
                    .relatedVideos(relatedVideos)
                    .build();
        }

        private List<String> searchForVideoIds(String videoTitle){
             SearchApiResponse response = webClient.get()
                     .uri(uriBuilder -> uriBuilder
                             .path("/search")
                             .queryParam("part", "snippet")
                             .queryParam("q", videoTitle)
                             .queryParam("type", "video")
                             .queryParam("maxResults", maxRelatedVideos)
                             .queryParam("key", apiKey)
                             .build())
                     .retrieve()
                     .bodyToMono(SearchApiResponse.class)
                     .block();

             if(response == null || response.getItems() == null){
                 return Collections.emptyList();
             }
             List<String> videoIds = new ArrayList<>();

             for(SearchItem item: response.getItems()){
                 videoIds.add(item.getId().getVideoId());
             }

             return videoIds;
        }

        public VideoDetails getVideoDetails(String videoId){
            VideoApiResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/videos")
                            .queryParam("part", "snippet")
                            .queryParam("id", videoId)
                            .queryParam("key", apiKey)
                            .build())
                    .retrieve()
                    .bodyToMono(VideoApiResponse.class)
                    .block();

            if(response == null || response.getItems().isEmpty()){
                return null;
            }

            Snippet snippet = response.getItems().get(0).getSnippet();
            String thumbnailUrl = snippet.getThumbnails().getBestThumbnailUrl();

            return VideoDetails.builder()
                    .id(videoId)
                    .title(snippet.getTitle())
                    .description(snippet.getDescription())
                    .tags(snippet.getTags() == null ? Collections.emptyList() : snippet.getTags())
                    .thumbnailUrl(thumbnailUrl)
                    .channelTitle(snippet.getChannelTitle())
                    .publishedAt(snippet.getPublishedAt())
                    .build();
        }

        private Video getVideoById(String videoId){
            VideoApiResponse response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/videos")
                            .queryParam("part", "snippet")
                            .queryParam("id", videoId)
                            .queryParam("key", apiKey)
                            .build())
                    .retrieve()
                    .bodyToMono(VideoApiResponse.class)
                    .block();

            if(response == null || response.getItems() == null){
                return null;
            }

            Snippet snippet = response.getItems().get(0).getSnippet();
            return Video.builder()
                    .id(videoId)
                    .channelTitle(snippet.getChannelTitle())
                    .title(snippet.getTitle())
                    .tags(snippet.getTags()==null ? Collections.emptyList():snippet.getTags())
                    .build();
        }
    }