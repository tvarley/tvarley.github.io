---
problemNumber: 40
title: "Champernowne's Constant"
description: |
  An irrational decimal fraction is created by concatenating the positive integers:
  $$0.12345678910{\color{red}\mathbf 1}112131415161718192021\cdots$$
  
  It can be seen that the $12$<sup>th</sup> digit of the fractional part is $1$.
  
  If $d_n$ represents the $n$<sup>th</sup> digit of the fractional part, find the value of the following expression.
  $$d_1 \times d_{10} \times d_{100} \times d_{1000} \times d_{10000} \times d_{100000} \times d_{1000000}$$
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 210
      
      #include <iostream>
      #include <vector>
      #include <string>
      
      long long champernowne() {
          std::string s = "";
          long long num = 1;
          while(s.size() < 1000001) {
              s += std::to_string(num++);
          }
          long long product = 1;
          std::vector<int> positions = {1,10,100,1000,10000,100000,1000000};
          for(int pos : positions) {
              product *= s[pos-1] - '0';
          }
          return product;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << champernowne() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler040.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution040 implements Solution {
        public String solve() {
          StringBuilder sb = new StringBuilder();
          for (int i = 1; ; i++) {
            sb.append(i);
            if (sb.length() >= 1000000) break;
          }
          String s = sb.toString();
          int prod = 1;
          prod *= s.charAt(0) - '0';
          prod *= s.charAt(9) - '0';
          prod *= s.charAt(99) - '0';
          prod *= s.charAt(999) - '0';
          prod *= s.charAt(9999) - '0';
          prod *= s.charAt(99999) - '0';
          prod *= s.charAt(999999) - '0';
          return Integer.toString(prod);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution040.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          let s = '';
          let i = 1;
          while (s.length < 1000000) {
            s += i.toString();
            i++;
          }
          return parseInt(s[0]) * parseInt(s[9]) * parseInt(s[99]) * parseInt(s[999]) * parseInt(s[9999]) * parseInt(s[99999]) * parseInt(s[999999]);
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution040.js"
  - language: "python"
    code: |
      def solve():
          """
          Champernowne's Constant
          An irrational decimal fraction is created by concatenating the positive integers:
      
          0.123456789101112131415161718192021…
      
          It can be seen that the 12th digit of the fractional part is 1.
      
          If dn represents the nth digit of the fractional part, find the value of the following expression.
      
          d1 × d10 × d100 × d1000 × d10000 × d100000 × d1000000
          https://projecteuler.net/problem=40
          """
          champernowne = ''
          n = 1
          while len(champernowne) < 1000000:
              champernowne += str(n)
              n += 1
          positions = [1, 10, 100, 1000, 10000, 100000, 1000000]
          product = 1
          for pos in positions:
              product *= int(champernowne[pos - 1])
          return product
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler040.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "strconv"
      
      func main() {
      	s := ""
      	for i := 1; len(s) < 1000000; i++ {
      		s += strconv.Itoa(i)
      	}
      	product := 1
      	for _, exp := range []int{1, 10, 100, 1000, 10000, 100000, 1000000} {
      		d := int(s[exp-1] - '0')
      		product *= d
      	}
      	fmt.Println(product)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler040.go"
  - language: "rust"
    code: |
      // Answer: 210
      
      pub fn champernownes_constant() -> u64 {
          let mut s = String::new();
          let mut n = 1;
          while s.len() < 1_000_000 {
              s += &format!("{}", n);
              n += 1;
          }
          let d1 = s.chars().nth(0).unwrap().to_digit(10).unwrap() as u64;
          let d10 = s.chars().nth(9).unwrap().to_digit(10).unwrap() as u64;
          let d100 = s.chars().nth(99).unwrap().to_digit(10).unwrap() as u64;
          let d1000 = s.chars().nth(999).unwrap().to_digit(10).unwrap() as u64;
          let d10000 = s.chars().nth(9999).unwrap().to_digit(10).unwrap() as u64;
          let d100000 = s.chars().nth(99999).unwrap().to_digit(10).unwrap() as u64;
          let d1000000 = s.chars().nth(999999).unwrap().to_digit(10).unwrap() as u64;
          d1 * d10 * d100 * d1000 * d10000 * d100000 * d1000000
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_040() {
              assert_eq!(champernownes_constant(), 210);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler040.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

Champernowne's constant is formed by concatenating positive integers: 0.1234567891011121314...

This constant is known to be transcendental (proved by Kurt Mahler in 1961), meaning it is not the root of any polynomial equation with rational coefficients.

The problem requires finding digits at specific positions in this concatenation and computing their product.

### Algorithm Analysis

The implementations use direct string construction:

- Build a string by concatenating integers 1, 2, 3, ... until exceeding 1,000,000 characters
- Extract digits at positions 1, 10, 100, 1000, 10000, 100000, 1000000 (1-based indexing)
- Multiply these digits together

The approach is straightforward but requires careful handling of string indexing.

### Performance Analysis

- **Time Complexity**: O(L) where L=10⁶, dominated by string concatenation and character access. Executes in milliseconds.
- **Space Complexity**: O(L) for storing the concatenated string (~1MB).
- **Execution Time**: Very fast (under 1 second), suitable for real-time applications.
- **Scalability**: Linear in required length, but memory usage becomes significant for larger constants.

### Key Insights

- The digits product is 1 × 1 × 5 × 3 × 7 × 2 × 1 = 210
- String concatenation is efficient in most languages for this scale
- Position-based extraction requires careful 0-based vs 1-based indexing
- The constant exhibits interesting digit distribution patterns

### Educational Value

This problem teaches:
- Construction of mathematical constants through concatenation
- String manipulation and indexing in programming
- The concept of transcendental numbers
- Handling large strings efficiently
- Position-based digit extraction and arithmetic operations
