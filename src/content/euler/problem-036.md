---
problemNumber: 36
title: "Double-base Palindromes"
description: |
  The decimal number, $585 = 1001001001_2$ (binary), is palindromic in both bases.
  
  Find the sum of all numbers, less than one million, which are palindromic in base $10$ and base $2$.
  
  <p class="smaller">(Please note that the palindromic number, in either base, may not include leading zeros.)
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 872187
      
      // Authored by: Tim Varley 💘
      // Assisted-by: Grok Code Fast via Crush 💘 <crush@charm.land>
      
      #include <iostream>
      #include <vector>
      #include <string>
      #include <algorithm>
      
      bool is_palindrome(const std::string& s) {
          std::string rev = s;
          std::reverse(rev.begin(), rev.end());
          return s == rev;
      }
      
      long long double_base_palindromes() {
          long long sum = 0;
          for(int n=1; n<1000000; n++) {
              std::string dec = std::to_string(n);
              if(!is_palindrome(dec)) continue;
              std::string bin = "";
              int temp = n;
              while(temp > 0) {
                  bin += (temp % 2) + '0';
                  temp /= 2;
              }
              std::reverse(bin.begin(), bin.end());
              if(is_palindrome(bin)) sum += n;
          }
          return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << double_base_palindromes() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler036.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution036 implements Solution {
        public String solve() {
          long sum = 0;
          for (int i = 1; i < 1000000; i++) {
            if (isPalindrome(Integer.toString(i)) && isPalindrome(Integer.toBinaryString(i))) sum += i;
          }
          return Long.toString(sum);
        }
      
        private boolean isPalindrome(String s) {
          return s.equals(new StringBuilder(s).reverse().toString());
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution036.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          function isPalindrome(s) {
            return s === s.split('').reverse().join('');
          }
      
          let sum = 0;
          for (let i = 1; i < 1000000; i++) {
            if (isPalindrome(i.toString()) && isPalindrome(i.toString(2))) {
              sum += i;
            }
          }
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution036.js"
  - language: "python"
    code: |
      def solve():
          """
          Double-base Palindromes
          The decimal number, 585 = 1001001001_2 (binary), is palindromic in both bases.
      
          Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.
      
          (Please note that the palindromic number, in either base, may not include leading zeros.)
          https://projecteuler.net/problem=36
          """
          def is_palindrome(s):
              return s == s[::-1]
      
          total = 0
          for n in range(1, 1000000):
              if is_palindrome(str(n)) and is_palindrome(bin(n)[2:]):
                  total += n
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler036.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "strconv"
      
      func isPalindrome(s string) bool {
      	for i := 0; i < len(s)/2; i++ {
      		if s[i] != s[len(s)-1-i] {
      			return false
      		}
      	}
      	return true
      }
      
      func main() {
      	sum := 0
      	for n := 1; n < 1000000; n++ {
      		s := strconv.Itoa(n)
      		if !isPalindrome(s) {
      			continue
      		}
      		bin := strconv.FormatInt(int64(n), 2)
      		if isPalindrome(bin) {
      			sum += n
      		}
      	}
      	fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler036.go"
  - language: "rust"
    code: |
      // Answer: 872187
      
      fn is_palindrome(s: &str) -> bool {
          s == s.chars().rev().collect::<String>()
      }
      
      pub fn double_base_palindromes() -> u64 {
          let mut sum = 0;
          for n in 1..1_000_000 {
              let dec = format!("{}", n);
              if is_palindrome(&dec) {
                  let bin = format!("{:b}", n);
                  if is_palindrome(&bin) {
                      sum += n;
                  }
              }
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_036() {
              assert_eq!(double_base_palindromes(), 872187);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler036.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A palindromic number reads the same forwards and backwards in a given base. A double-base palindrome is palindromic in both decimal (base 10) and binary (base 2).

For example, 585₁₀ = 1001001001₂, both palindromic.

### Algorithm Analysis

The implementations use brute force enumeration:

- Iterate through all numbers from 1 to 999,999
- Convert each number to string (decimal) and check if palindromic
- Convert to binary string and check if palindromic
- Sum numbers that satisfy both conditions

Palindrome checking uses string reversal comparison.

### Performance Analysis

- **Time Complexity**: O(n × d) where n=10⁶ and d=20 (max digits), resulting in ~2×10⁷ operations. Executes in milliseconds on modern hardware.
- **Space Complexity**: O(1) - only current number and strings stored.
- **Execution Time**: Very fast (under 1 second), suitable for real-time applications.
- **Scalability**: Linear in n, but could be optimized by generating palindromes directly.

### Key Insights

- Sum of double-base palindromes below 1,000,000 is 872,187
- Single-digit numbers (1-9) are trivially palindromic in both bases
- Binary palindromes often correspond to numbers with specific bit patterns
- Leading zeros are not considered in either base representation

### Educational Value

This problem teaches:
- Number representation in different bases
- String manipulation and palindrome detection
- The concept of numerical bases beyond decimal
- Brute-force enumeration with multiple conditions
- Bit manipulation and binary number properties
