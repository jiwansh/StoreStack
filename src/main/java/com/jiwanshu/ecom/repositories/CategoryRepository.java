package com.jiwanshu.ecom.repositories;

import com.jiwanshu.ecom.model.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {

    Category findByCategoryName(@NotBlank @Size(min = 5, message = "Minimum 5 characters neededfor category name") String categoryName);
}
