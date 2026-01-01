package com.You.Tube.Tools.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class VideoApiResponse{
   private List<VideoItem> items;
}
