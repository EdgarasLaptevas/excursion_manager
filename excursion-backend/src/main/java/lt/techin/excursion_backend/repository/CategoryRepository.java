package lt.techin.excursion_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lt.techin.excursion_backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
}
