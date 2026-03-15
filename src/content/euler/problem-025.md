---
problemNumber: 25
title: "1000-digit Fibonacci Number"
description: |
  The Fibonacci sequence is defined by the recurrence relation:

  $F_n = F_{n - 1} + F_{n - 2}$, where $F_1 = 1$ and $F_2 = 1$.

  Hence the first 12 terms will be:

  $F_1 = 1$
  $F_2 = 1$
  $F_3 = 2$
  $F_4 = 3$
  $F_5 = 5$
  $F_6 = 8$
  $F_7 = 13$
  $F_8 = 21$
  $F_9 = 34$
  $F_{10} = 55$
  $F_{11} = 89$
  $F_{12} = 144$

  The $12$th term, $F_{12}$, is the first term to contain three digits.

  What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=25
      // 1000-digit Fibonacci number
      //
      // The Fibonacci sequence is defined by the recurrence relation:
      // 
      // Fn = Fn−1 + Fn−2, where F1 = 1 and F2 = 1.
      // Hence the first 12 terms will be:
      // 
      // F1 = 1
      // F2 = 1
      // F3 = 2
      // F4 = 3
      // F5 = 5
      // F6 = 8
      // F7 = 13
      // F8 = 21
      // F9 = 34
      // F10 = 55
      // F11 = 89
      // F12 = 144
      // The 12th term, F12, is the first term to contain three digits.
      // 
      // What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
      
      // Answer: 4782
      
      #include <algorithm>
      #include <iostream>
      #include <string>
      #include <vector>
      
      #include "simple_timer.h"
      
      typedef std::vector<uint32_t> Zbigint;
      
      Zbigint add(const Zbigint& a, const Zbigint& b) {
          Zbigint result;
          uint32_t carry = 0;
          size_t max_size = std::max(a.size(), b.size());
          result.reserve(max_size + 1);
          for (size_t i = 0; i < max_size || carry; ++i) {
              uint32_t sum = carry;
              if (i < a.size()) sum += a[i];
              if (i < b.size()) sum += b[i];
              result.push_back(sum % 1000000000);  // base 1e9
              carry = sum / 1000000000;
          }
          return result;
      }
      
      size_t get_digit_count(const Zbigint& num) {
          if (num.empty()) return 1;
          size_t digits = (num.size() - 1) * 9;  // 9 digits per uint32_t except last
          uint32_t last = num.back();
          while (last > 0) {
              digits++;
              last /= 10;
          }
          return digits;
      }
      
      int z1000_digit_fibinacci_number() {
          Zbigint fib1 = {1};
          Zbigint fib2 = {1};
          int index = 2;
          while (get_digit_count(fib1) < 1000) {
              Zbigint next = add(fib1, fib2);
              fib2 = fib1;
              fib1 = next;
              index++;
          }
          return index;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << z1000_digit_fibinacci_number() << std::endl;
      }
      #endif //#if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler025.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.math.BigInteger;
      
      public class Solution025 implements Solution {
        public String solve() {
          BigInteger a = BigInteger.ONE;
          BigInteger b = BigInteger.ONE;
          int index = 2;
      
          while (b.toString().length() < 1000) {
            BigInteger next = a.add(b);
            a = b;
            b = next;
            index++;
          }
      
          return Integer.toString(index);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution025.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          let a = 1n;
          let b = 1n;
          let index = 2;
      
          while (true) {
            const next = a + b;
            index++;
            a = b;
            b = next;
      
            if (b.toString().length >= 1000) {
              return index;
            }
          }
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution025.js"
  - language: "python"
    code: |
      def solve():
          """
          1000-digit Fibonacci number
          The Fibonacci sequence is defined by the recurrence relation:
          F_n = F_(n-1) + F_(n-2), where F_1 = 1 and F_2 = 1.
          What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
          https://projecteuler.net/problem=25
          """
          a, b = 1, 1
          index = 2
          while len(str(b)) < 1000:
              a, b = b, a + b
              index += 1
          return index
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler025.py"
  - language: "ruby"
    code: |
      def euler025_solution
        a = 1
        b = 1
        index = 2
        loop do
          c = a + b
          index += 1
          break if c.to_s.length >= 1000
          a = b
          b = c
        end
        index
      end
      
      puts euler025_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler025.rb"
  - language: "go"
    code: |
      package main
      
      import (
          "fmt"
          "math/big"
      )
      
      func main() {
          target := new(big.Int)
          target.Exp(big.NewInt(10), big.NewInt(999), nil)
      
          a := big.NewInt(1)
          b := big.NewInt(1)
          idx := 2
      
          for a.Cmp(target) < 0 {
              next := new(big.Int).Add(a, b)
              a, b = next, a
              idx++
          }
      
          fmt.Println(idx)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler025.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=25
      //
      // The Fibonacci sequence is defined by the recurrence relation:
      // F(n) = F(n−1) + F(n−2), where F(1) = 1 and F(2) = 1.
      //
      // The 12th term, F(12), is the first term to contain three digits.
      // What is the index of the first term in the Fibonacci sequence to contain 1000 digits?
      //
      // Answer: 4782
      
      pub fn fibonacci_1000_digits(num_digits: usize) -> usize {
          let mut a = vec![1u32]; // F(1)
          let mut b = vec![1u32]; // F(2)
          let mut index = 2;
      
          fn add_vecs(x: &[u32], y: &[u32]) -> Vec<u32> {
              let len = x.len().max(y.len());
              let mut result = Vec::with_capacity(len + 1);
              let mut carry = 0u32;
              for i in 0..len {
                  let xi = if i < x.len() { x[i] } else { 0 };
                  let yi = if i < y.len() { y[i] } else { 0 };
                  let sum = xi + yi + carry;
                  result.push(sum % 10);
                  carry = sum / 10;
              }
              if carry > 0 {
                  result.push(carry);
              }
              result
          }
      
          loop {
              let c = add_vecs(&a, &b);
              index += 1;
              if c.len() >= num_digits {
                  return index;
              }
              a = b;
              b = c;
          }
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_025() {
              assert_eq!(fibonacci_1000_digits(3), 12);
              assert_eq!(fibonacci_1000_digits(1000), 4782);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler025.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The [Fibonacci sequence](https://grokipedia.com/page/Fibonacci_sequence) exhibits exponential growth with a growth rate determined by the [golden ratio](https://grokipedia.com/page/Golden_ratio) φ ≈ 1.618. The number of digits d of F_n grows linearly with n:

d ≈ n × log₁₀(φ) - log₁₀(√5)

For 1000 digits: n ≈ (1000 + log₁₀(√5)) / log₁₀(φ) ≈ 4781.8, which matches the answer of 4782.

The sequence grows so rapidly that F_4782 has exactly 1000 digits, while F_4781 has 999 digits.

### Algorithm Analysis

All implementations generate Fibonacci numbers iteratively until reaching 1000 digits. The choice of big integer handling varies by language:

- **Built-in big integers** (Python, Java, Go, JavaScript with BigInt): Simple iterative generation
- **Custom big integer arithmetic** (C++, Rust): Manual addition with digit arrays
- **String manipulation** (Ruby): Convert to string to check length

Time complexity is O(n²) where n is the number of digits, due to big integer operations scaling with digit count.

### Key Insights

- Fibonacci numbers grow exponentially, making direct computation feasible even for large indices
- The index grows logarithmically with the number of digits required
- Big integer libraries are essential for handling numbers larger than 64-bit integers
- The transition from F_4781 (999 digits) to F_4782 (1000 digits) demonstrates the rapid growth

### Educational Value

This problem teaches:
- Exponential growth in sequences and its mathematical analysis
- The limitations of fixed-size integer types
- Big integer arithmetic implementation and library usage
- The relationship between algorithmic complexity and problem constraints
- How mathematical analysis can predict computational requirements
