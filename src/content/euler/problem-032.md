---
problemNumber: 32
title: "Problem 32"
description: |
  Pandigital Products We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital. The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital. Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital. HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum. Answer: 45228
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <string>
      #include <algorithm>
      #include <set>
      
      long long pandigital_products() {
          std::string digits = "123456789";
          std::set<long long> products;
          std::sort(digits.begin(), digits.end());
          do {
              for(int i=1; i<=4; i++) {
                  for(int j=i+1; j<=8; j++) {
                      std::string sa = digits.substr(0,i);
                      std::string sb = digits.substr(i,j-i);
                      std::string sc = digits.substr(j);
                      long long a = std::stoll(sa);
                      long long b = std::stoll(sb);
                      long long c = std::stoll(sc);
                      if(a * b == c) {
                          products.insert(c);
                      }
                  }
              }
          } while(std::next_permutation(digits.begin(), digits.end()));
          long long sum = 0;
          for(auto p : products) sum += p;
          return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << pandigital_products() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler032.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.util.*;
      
      public class Solution032 implements Solution {
        public String solve() {
          Set<Integer> products = new HashSet<>();
          String digits = "123456789";
          permute(digits, 0, products);
          int sum = 0;
          for (int p : products) sum += p;
          return Integer.toString(sum);
        }
      
        private void permute(String s, int start, Set<Integer> products) {
          if (start == s.length()) {
            checkProducts(s, products);
            return;
          }
          for (int i = start; i < s.length(); i++) {
            s = swap(s, start, i);
            permute(s, start + 1, products);
            s = swap(s, start, i);
          }
        }
      
        private String swap(String s, int i, int j) {
          char[] arr = s.toCharArray();
          char temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          return new String(arr);
        }
      
        private void checkProducts(String perm, Set<Integer> products) {
          for (int i = 1; i < perm.length(); i++) {
            for (int j = i + 1; j < perm.length(); j++) {
              String a = perm.substring(0, i);
              String b = perm.substring(i, j);
              String c = perm.substring(j);
              if (a.charAt(0) == '0' || b.charAt(0) == '0' || c.charAt(0) == '0') continue;
              int numA = Integer.parseInt(a);
              int numB = Integer.parseInt(b);
              int numC = Integer.parseInt(c);
              if (numA * numB == numC) {
                products.add(numC);
              }
            }
          }
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution032.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          function isPandigital(str) {
            if (str.length !== 9 || str.includes('0')) return false;
            return new Set(str).size === 9;
          }
      
          const products = new Set();
          for (let a = 1; a < 10000; a++) {
            for (let b = 1; a * b < 10000 && b <= a; b++) {
              const c = a * b;
              const concat = a.toString() + b.toString() + c.toString();
              if (isPandigital(concat)) {
                products.add(c);
              }
            }
          }
          return Array.from(products).reduce((sum, p) => sum + p, 0);
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution032.js"
  - language: "python"
    code: |
      def solve():
          """
          Pandigital Products
          We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.
      
          The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
      
          Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
      
          HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
          https://projecteuler.net/problem=32
          """
          import itertools
          digits = '123456789'
          products = set()
          for perm in itertools.permutations(digits):
              # Case 1: 1-digit * 4-digit = 4-digit
              a = int(''.join(perm[:1]))
              b = int(''.join(perm[1:5]))
              c = int(''.join(perm[5:]))
              if a * b == c:
                  products.add(c)
              # Case 2: 2-digit * 3-digit = 4-digit
              a = int(''.join(perm[:2]))
              b = int(''.join(perm[2:5]))
              c = int(''.join(perm[5:]))
              if a * b == c:
                  products.add(c)
          return sum(products)
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler032.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "strconv"
      
      func isPandigital(s string) bool {
      	if len(s) != 9 {
      		return false
      	}
      	digits := make([]int, 10)
      	for _, c := range s {
      		if c == '0' {
      			return false
      		}
      		d := int(c - '0')
      		if digits[d] > 0 {
      			return false
      		}
      		digits[d]++
      	}
      	return true
      }
      
      func main() {
      	products := make(map[int]bool)
      	for a := 1; a < 10000; a++ {
      		for b := 1; b < 10000/a; b++ {
      			c := a * b
      			s := strconv.Itoa(a) + strconv.Itoa(b) + strconv.Itoa(c)
      			if len(s) == 9 && isPandigital(s) {
      				products[c] = true
      			}
      		}
      	}
      	sum := 0
      	for p := range products {
      		sum += p
      	}
      	fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler032.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=32
      //
      // We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.
      // The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.
      // Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.
      // HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.
      //
      // Answer: 45228
      
      use std::collections::HashSet;
      
      pub fn pandigital_products() -> u64 {
          let mut products = HashSet::new();
          let digits: Vec<char> = "123456789".chars().collect();
          let mut perms = vec![];
          permute(&digits, 0, &mut perms);
          for perm in perms {
              let s: String = perm.into_iter().collect();
              for i in 1..=4 {
                  for j in (i + 1)..=5 {
                      let a_str = &s[0..i];
                      let b_str = &s[i..j];
                      let c_str = &s[j..9];
                      if c_str.is_empty() {
                          continue;
                      }
                      let a: u64 = a_str.parse().unwrap();
                      let b: u64 = b_str.parse().unwrap();
                      let c: u64 = c_str.parse().unwrap();
                      if a * b == c {
                          products.insert(c);
                      }
                  }
              }
          }
          products.iter().sum()
      }
      
      fn permute(digits: &Vec<char>, start: usize, result: &mut Vec<Vec<char>>) {
          if start == digits.len() {
              result.push(digits.clone());
              return;
          }
          let mut digits = digits.clone();
          for i in start..digits.len() {
              digits.swap(start, i);
              permute(&digits, start + 1, result);
              digits.swap(start, i);
          }
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_032() {
              assert_eq!(pandigital_products(), 45228);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler032.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A number is pandigital if it uses each digit from 1 to n exactly once. For n=9, we need to find all triplets (a, b, c) where a × b = c, and the concatenation of a, b, and c uses digits 1-9 exactly once.

This requires finding all ways to split the 9 digits into three groups that form valid multiplication equations, with the constraint that no number starts with zero and all digits are unique.

### Algorithm Analysis

The implementations use a brute-force approach with permutations:

- Generate all permutations of digits "123456789"
- For each permutation, try all possible ways to split it into three non-empty parts (a, b, c)
- Convert each part to numbers and check if a × b = c
- Collect unique products in a set to handle duplicates

The C++ implementation uses std::next_permutation for efficiency, while others use recursive generation or nested loops.

### Performance Analysis

- **Time Complexity**: O(9! × k) where 9! = 362,880 and k is the number of split positions tried (typically small, around 10-20). This results in approximately 3-7 million operations, executing in milliseconds.
- **Space Complexity**: O(9!) for storing all permutations in memory (some implementations), or O(1) additional space beyond the current permutation being processed.
- **Execution Time**: Very fast (under 1 second) due to the small input size; suitable for interactive applications.
- **Scalability**: Limited to n=9 due to factorial growth, but optimal for the given constraints.

### Key Insights

- Permutations ensure all digit arrangements are considered while maintaining uniqueness
- Multiple ways to split the same digits can yield the same product, hence the need for deduplication
- Leading zeros must be avoided to prevent invalid numbers
- The problem has only a few valid solutions despite the large search space

### Educational Value

This problem teaches:
- Permutation generation and combinatorial algorithms
- String manipulation and number parsing in different languages
- The importance of handling edge cases (leading zeros, duplicates)
- How brute-force approaches work efficiently for small, constrained problems
- Pandigital number properties and their applications in recreational mathematics
