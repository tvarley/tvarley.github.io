---
problemNumber: 4
title: "Largest Palindrome Product"
description: |
  A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is:

  \(9009 = 91 \times 99\)

  Find the largest palindrome made from the product of two 3-digit numbers.
difficulty: "easy"
date: 2015-01-02
technologies: ["cpp", "javascript", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <string>
      #include <algorithm>

      bool is_palindrome(int n) {
          std::string s = std::to_string(n);
          std::string rev = s;
          std::reverse(rev.begin(), rev.end());
          return s == rev;
      }

      int largest_palindrome_product() {
          int max_palindrome = 0;
          for (int i = 999; i >= 100; --i) {
              for (int j = 999; j >= 100; --j) {
                  int product = i * j;
                  if (product <= max_palindrome) break;
                  if (is_palindrome(product)) {
                      max_palindrome = product;
                  }
              }
          }
          return max_palindrome;
      }

      int main() {
          std::cout << largest_palindrome_product() << std::endl;
          return 0;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler004.cpp"
  - language: "javascript"
    code: |
      function isPalindrome(n) {
          const s = n.toString();
          return s === s.split('').reverse().join('');
      }

      function largestPalindromeProduct() {
          let maxPalindrome = 0;
          for (let i = 999; i >= 100; i--) {
              for (let j = 999; j >= 100; j--) {
                  const product = i * j;
                  if (product <= maxPalindrome) break;
                  if (isPalindrome(product)) {
                      maxPalindrome = product;
                  }
              }
          }
          return maxPalindrome;
      }

      console.log(largestPalindromeProduct());
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler004.js"
  - language: "ruby"
    code: |
      def is_palindrome?(n)
        s = n.to_s
        s == s.reverse
      end

      def largest_palindrome_product
        max_palindrome = 0
        (100..999).reverse_each do |i|
          (100..999).reverse_each do |j|
            product = i * j
            break if product <= max_palindrome
            max_palindrome = product if is_palindrome?(product)
          end
        end
        max_palindrome
      end

      puts largest_palindrome_product
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler004.rb"
  - language: "go"
    code: |
      package main

      import (
          "fmt"
          "strconv"
      )

      func isPalindrome(n int) bool {
          s := strconv.Itoa(n)
          runes := []rune(s)
          for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
              if runes[i] != runes[j] {
                  return false
              }
          }
          return true
      }

      func largestPalindromeProduct() int {
          maxPalindrome := 0
          for i := 999; i >= 100; i-- {
              for j := 999; j >= 100; j-- {
                  product := i * j
                  if product <= maxPalindrome {
                      break
                  }
                  if isPalindrome(product) {
                      maxPalindrome = product
                  }
              }
          }
          return maxPalindrome
      }

      func main() {
          fmt.Println(largestPalindromeProduct())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler004.go"
  - language: "rust"
    code: |
      fn is_palindrome(n: u32) -> bool {
          let s = n.to_string();
          let rev: String = s.chars().rev().collect();
          s == rev
      }

      fn largest_palindrome_product() -> u32 {
          let mut max_palindrome = 0;
          for i in (100..=999).rev() {
              for j in (100..=999).rev() {
                  let product = i * j;
                  if product <= max_palindrome {
                      break;
                  }
                  if is_palindrome(product) {
                      max_palindrome = product;
                  }
              }
          }
          max_palindrome
      }

      fn main() {
          println!("{}", largest_palindrome_product());
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler004.rs"
tags: ["euler", "palindrome", "brute-force"]
featured: true
showcase: true
---

## Solution Approach

This problem requires finding the largest palindromic number that is the product of two 3-digit numbers. The brute force approach checks all possible products in descending order, starting from the largest possible numbers (999 × 999) and working downwards, which ensures we find the largest palindrome first.