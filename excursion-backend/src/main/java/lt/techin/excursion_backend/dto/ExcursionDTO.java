package lt.techin.excursion_backend.dto;

import java.util.List;

public class ExcursionDTO {
    private Integer id;
    private String title;
    private String photo_url;
    private String duration;
    private double price;
    private String categoryName;
    private List<ExcursionDateDTO> datesList;

    public ExcursionDTO() {

    }

    public ExcursionDTO(Integer id, String title, String photo_url, String duration, double price,
            String categoryName, List<ExcursionDateDTO> datesList) {
        this.id = id;
        this.title = title;
        this.photo_url = photo_url;
        this.duration = duration;
        this.price = price;
        this.categoryName = categoryName;
        this.datesList = datesList;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPhoto_url() {
        return photo_url;
    }

    public void setPhoto_url(String photo_url) {
        this.photo_url = photo_url;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<ExcursionDateDTO> getDatesList() {
        return datesList;
    }

    public void setDatesList(List<ExcursionDateDTO> datesList) {
        this.datesList = datesList;
    }
}