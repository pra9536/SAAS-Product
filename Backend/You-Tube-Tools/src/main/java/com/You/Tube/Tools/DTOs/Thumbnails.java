package com.You.Tube.Tools.DTOs;

import lombok.Data;

@Data
public class Thumbnails{
    private Thumbnail maxres;
    private Thumbnail high;
    private Thumbnail medium;
    private Thumbnail _default;

    public String getBestThumbnailUrl(){
        if(maxres != null) return maxres.url;
        if(high != null) return high.url;
        if(medium != null) return medium.url;
        return _default != null ? _default.url : "";
    }

}
