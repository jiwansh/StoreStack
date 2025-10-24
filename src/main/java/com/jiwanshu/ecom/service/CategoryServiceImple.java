package com.jiwanshu.ecom.service;

import com.jiwanshu.ecom.exceptions.APIException;
import com.jiwanshu.ecom.exceptions.ResourceNotFoundException;
import com.jiwanshu.ecom.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.jiwanshu.ecom.repositories.CategoryRepository;

import java.util.List;

@Service
public class CategoryServiceImple implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        List<Category> categories=categoryRepository.findAll();
        if(categories.isEmpty())
            throw new APIException("No Category created till now");
        return categories;

    }

    @Override
    public void createCategory(Category category) {
        Category savedCategory = categoryRepository.findByCategoryName(category.getCategoryName());
        if(savedCategory!=null){
            throw new APIException("Category with the name"+category.getCategoryName()+" already exists");
        }
        categoryRepository.save(category);
    }

    @Override
    public String deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId).
                orElseThrow(() -> new ResourceNotFoundException("Category","categoryId",categoryId));

        categoryRepository.delete(category);
        return "Category with categoryId "+ categoryId+"deleted successfully";
    }

    @Override
    public Category updateCategory(Category category, Long categoryId) {

        Category savedCategory = categoryRepository.findById(categoryId).
                orElseThrow(() -> new ResourceNotFoundException("Category","categoryId",categoryId));

        category.setCategoryId(categoryId);
        savedCategory =categoryRepository.save(category);
        return savedCategory;
    }
}
