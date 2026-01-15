package com.jiwanshu.ecom.service;

import com.jiwanshu.ecom.model.Category;
import com.jiwanshu.ecom.payload.CategoryDTO;
import com.jiwanshu.ecom.payload.CategoryResponse;

import java.util.List;

public interface CategoryService {
    CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize,String sortBy,String sortOrder);

    CategoryDTO createCategory(CategoryDTO categoryDTO);

    CategoryDTO deleteCategory(Long categoryId);

    CategoryDTO updateCategory(CategoryDTO categoryDTO, Long categoryId);
}
