package com.sun_forest.sun_forest.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sun_forest.sun_forest.products.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

}
