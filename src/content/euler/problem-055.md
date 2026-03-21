---
problemNumber: 55
title: "Lychrel numbers"
description: |
  If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.

  Not all numbers produce palindromes so quickly. For example, 349 took three iterations to arrive at a palindrome.

  Although no one has proved it yet, it is thought that some numbers, like 196, never produce a palindrome. A number that never forms a palindrome through the reverse and add process is called a Lychrel number. 

  How many Lychrel numbers are there below ten-thousand?
difficulty: "medium"
date: 2026-03-20
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <string>
      #include <algorithm>

      static std::string add_strings(const std::string& a, const std::string& b) {
          std::string result;
          int carry = 0;
          int i = a.size() - 1;
          int j = b.size() - 1;
          while (i >= 0 || j >= 0 || carry) {
              int sum = carry;
              if (i >= 0) sum += a[i--] - '0';
              if (j >= 0) sum += b[j--] - '0';
              carry = sum / 10;
              result.push_back(sum % 10 + '0');
          }
          std::reverse(result.begin(), result.end());
          return result;
      }

      static bool is_palindrome_lychrel(const std::string& s) {
          std::string rev = s;
          std::reverse(rev.begin(), rev.end());
          return s == rev;
      }

      bool is_lychrel(long long n) {
          std::string n_str = std::to_string(n);
          for (int iter = 0; iter < 50; ++iter) {
              std::string rev = n_str;
              std::reverse(rev.begin(), rev.end());
              std::string sum_str = add_strings(n_str, rev);
              if (is_palindrome_lychrel(sum_str)) return false;
              n_str = sum_str;
          }
          return true;
      }

      int lychrel_numbers() {
          int count = 0;
          for (long long i = 1; i < 10000; ++i) {
              if (is_lychrel(i)) ++count;
          }
          return count;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << lychrel_numbers() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler055.cpp"
    performance: "O(1) per number with reverse check"
  - language: "go"
    code: |
      package main

      import (
      	"fmt"
      	"math/big"
      )

      func reverse(s string) string {
      	runes := []rune(s)
      	for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {
      		runes[i], runes[j] = runes[j], runes[i]
      	}
      	return string(runes)
      }

      func isPalindrome(s string) bool {
      	return s == reverse(s)
      }

      func isLychrel(n int) bool {
      	num := big.NewInt(int64(n))
      	for i := 0; i < 50; i++ {
      		revStr := reverse(num.String())
      		rev := new(big.Int)
      		rev.SetString(revStr, 10)
      		num.Add(num, rev)
      		if isPalindrome(num.String()) {
      			return false
      		}
      	}
      	return true
      }

      func main() {
      	count := 0
      	for i := 1; i < 10000; i++ {
      		if isLychrel(i) {
      			count++
      		}
      	}
      	fmt.Println(count)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler055.go"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.math.BigInteger;

      public class Solution055 implements Solution {
        public String solve() {
          int count = 0;
          for (int n = 1; n < 10000; n++) {
            if (isLychrel(n)) {
              count++;
            }
          }
          return Integer.toString(count);
        }

        private boolean isLychrel(int n) {
          BigInteger num = BigInteger.valueOf(n);
          for (int i = 0; i < 50; i++) {
            BigInteger rev = new BigInteger(reverse(num.toString()));
            num = num.add(rev);
            if (isPalindrome(num.toString())) {
              return false;
            }
          }
          return true;
        }

        private String reverse(String s) {
          return new StringBuilder(s).reverse().toString();
        }

        private boolean isPalindrome(String s) {
          return s.equals(reverse(s));
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution055.java"
  - language: "javascript"
    code: |
      const isPalindrome = (str) => {
        return str === str.split('').reverse().join('');
      };

      const reverseAdd = (n) => {
        const str = n.toString();
        const rev = str.split('').reverse().join('');
        return BigInt(n) + BigInt(rev);
      };

      const isLychrel = (n, maxIter = 50) => {
        let current = BigInt(n);
        for (let i = 0; i < maxIter; i++) {
          current = reverseAdd(current);
          if (isPalindrome(current.toString())) return false;
        }
        return true;
      };

      module.exports = {
        answer: () => {
          let count = 0;
          for (let i = 1; i < 10000; i++) {
            if (isLychrel(i)) count++;
          }
          return count;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution055.js"
  - language: "python"
    code: |
      def is_palindrome(n):
          s = str(n)
          return s == s[::-1]

      def reverse_add(n):
          return n + int(str(n)[::-1])

      def solve():
          count = 0
          for i in range(1, 10000):
              num = i
              for _ in range(50):
                  num = reverse_add(num)
                  if is_palindrome(num):
                      break
              else:
                  count += 1
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler055.py"
  - language: "rust"
    code: |
      use num_bigint::BigUint;

      pub fn lychrel_numbers() -> u32 {
          let mut count = 0;
          for n in 1..10000 {
              if is_lychrel(n) {
                  count += 1;
              }
          }
          count
      }

      fn is_lychrel(n: u64) -> bool {
          let mut num = BigUint::from(n);
          for _ in 0..50 {
              let rev = reverse_big(&num);
              num += &rev;
              if is_palindrome(&num) {
                  return false;
              }
          }
          true
      }

      fn reverse_big(n: &BigUint) -> BigUint {
          let s = n.to_string();
          let rev_s: String = s.chars().rev().collect();
          BigUint::parse_bytes(rev_s.as_bytes(), 10).unwrap()
      }

      fn is_palindrome(n: &BigUint) -> bool {
          let s = n.to_string();
          s == s.chars().rev().collect::<String>()
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_055() {
              assert_eq!(lychrel_numbers(), 249);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler055.rs"
tags: ["euler"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

[Lychrel numbers](https://grokipedia.com/page/Lychrel_number) emerge from the mysterious "reverse-and-add" process, where numbers are repeatedly added to their digit reversals until a [palindrome](https://grokipedia.com/page/Palindrome) forms. While most numbers quickly converge to palindromes, certain numbers (like 196) resist, potentially forever. This process reveals deep connections to [number theory](https://grokipedia.com/page/Number_theory) and unsolved conjectures in mathematics.

### Algorithm Analysis

The solution iterates through numbers 1-9999, applying the reverse-and-add process up to 50 times per number. Each iteration involves string manipulation for reversal and big integer arithmetic to handle growing numbers. The 50-iteration limit prevents infinite loops while capturing all known Lychrel numbers below 10,000.

### Key Insights

Exactly 249 Lychrel numbers lurk below 10,000, with 196 being the smallest and most notorious candidate. Surprisingly, some palindromes themselves are Lychrel numbers! The algorithm's efficiency stems from early termination on palindrome detection, making it feasible despite the computational intensity.

### Educational Value

This problem introduces elegant string algorithms for digit manipulation and highlights the beauty of [iterative processes](https://grokipedia.com/page/Iterative_method) in computational math. It touches on unsolved problems in [mathematical conjectures](https://grokipedia.com/page/Mathematical_conjecture), showing how programming can explore theoretical frontiers. Perfect for understanding why some numbers "fight back" against becoming palindromic!