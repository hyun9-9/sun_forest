package com.sun_forest.sun_forest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.entity.products.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

}
