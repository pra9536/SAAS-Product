package com.You.Tube.Tools.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class Snippet{
    private String title;
    private String description;
    private String channelTitle;
    private String publishedAt;
    private List<String> tags;
    private Thumbnails thumbnails;
}
