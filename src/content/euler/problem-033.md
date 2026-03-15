---
problemNumber: 33
title: "Problem 33"
description: |
  Digit Cancelling Fractions The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s. We shall consider fractions like, 30/50 = 3/5, to be trivial examples. There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator. If the product of these four fractions is given in its lowest common terms, find the value of the denominator. Answer: 100
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <numeric>
      
      int digit_cancelling_fractions() {
          long long num = 16LL * 19 * 26 * 49;
          long long den = 64LL * 95 * 65 * 98;
          long long g = std::gcd(num, den);
          num /= g;
          den /= g;
          return den;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << digit_cancelling_fractions() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler033.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution033 implements Solution {
        public String solve() {
          long num = 1;
          long den = 1;
          for (int a = 10; a < 100; a++) {
            for (int b = a + 1; b < 100; b++) {
              if (isCurious(a, b)) {
                num *= a;
                den *= b;
              }
            }
          }
          long gcd = gcd(num, den);
          return Long.toString(den / gcd);
        }
      
        private boolean isCurious(int a, int b) {
          String as = Integer.toString(a);
          String bs = Integer.toString(b);
          if (as.charAt(1) == bs.charAt(0) && as.charAt(1) != '0') {
            int na = as.charAt(0) - '0';
            int nb = bs.charAt(1) - '0';
            if (nb != 0 && (double)a / b == (double)na / nb) {
              return true;
            }
          }
          return false;
        }
      
        private long gcd(long a, long b) {
          return b == 0 ? a : gcd(b, a % b);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution033.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          function gcd(a, b) {
            return b === 0 ? a : gcd(b, a % b);
          }
      
          let num = 1, den = 1;
          for (let a = 10; a < 100; a++) {
            for (let b = a + 1; b < 100; b++) {
              const sa = a.toString(), sb = b.toString();
              if (sa[1] === sb[1] && sa[1] !== '0') {
                const x = parseInt(sa[0]), y = parseInt(sb[0]);
                if (x * b === y * a) {
                  num *= x;
                  den *= y;
                }
              }
              if (sa[0] === sb[1] && sa[0] !== '0') {
                const x = parseInt(sa[1]), y = parseInt(sb[0]);
                if (x * b === y * a) {
                  num *= x;
                  den *= y;
                }
              }
              if (sa[1] === sb[0] && sa[1] !== '0') {
                const x = parseInt(sa[0]), y = parseInt(sb[1]);
                if (x * b === y * a) {
                  num *= x;
                  den *= y;
                }
              }
            }
          }
          return den / gcd(num, den);
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution033.js"
  - language: "python"
    code: |
      def solve():
          """
          Digit Cancelling Fractions
          The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.
      
          We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
      
          There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.
      
          If the product of these four fractions is given in its lowest common terms, find the value of the denominator.
          https://projecteuler.net/problem=33
          """
          from fractions import Fraction
          result = Fraction(1, 1)
          for num in range(10, 100):
              for den in range(num + 1, 100):
                  if num % 10 == 0 and den % 10 == 0:
                      continue
                  num_str = str(num)
                  den_str = str(den)
                  common_digits = set(num_str) & set(den_str)
                  if not common_digits or '0' in common_digits:
                      continue
                  for d in common_digits:
                      if d in num_str and d in den_str:
                          new_num = int(num_str.replace(d, '', 1))
                          new_den = int(den_str.replace(d, '', 1))
                          if new_den != 0 and Fraction(num, den) == Fraction(new_num, new_den):
                              result *= Fraction(num, den)
                              break
          return result.denominator
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler033.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func gcd(a, b int) int {
      	for b != 0 {
      		a, b = b, a%b
      	}
      	return a
      }
      
      func main() {
      	num := 1
      	den := 1
      	for a := 1; a < 10; a++ {
      		for b := 1; b < 10; b++ {
      			for c := 1; c < 10; c++ {
      				if a == c {
      					continue
      				}
      				num1 := 10*a + b
      				den1 := 10*b + c
      				if num1 >= den1 {
      					continue
      				}
      				if num1*c == den1*a {
      					num *= a
      					den *= c
      				}
      			}
      		}
      	}
      	g := gcd(num, den)
      	fmt.Println(den / g)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler033.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=33
      //
      // The fraction 49/98 is a curious fraction, as an inexperienced mathematician in attempting to simplify it may incorrectly believe that 49/98 = 4/8, which is correct, is obtained by cancelling the 9s.
      // We shall consider fractions like, 30/50 = 3/5, to be trivial examples.
      // There are exactly four non-trivial examples of this type of fraction, less than one in value, and containing two digits in the numerator and denominator.
      // If the product of these four fractions is given in its lowest common terms, find the value of the denominator.
      //
      // Answer: 100
      
      pub fn digit_cancelling_fractions() -> u64 {
          let mut product_num = 1;
          let mut product_den = 1;
          for num in 10..100 {
              for den in (num + 1)..100 {
                  let num_str = format!("{}", num);
                  let den_str = format!("{}", den);
                  let mut common = vec![];
                  for &c in num_str.as_bytes() {
                      if den_str.as_bytes().contains(&c) && c != b'0' {
                          common.push(c);
                      }
                  }
                  for &digit in &common {
                      let new_num_str: String = num_str.chars().filter(|&c| c != digit as char).collect();
                      let new_den_str: String = den_str.chars().filter(|&c| c != digit as char).collect();
                      if new_num_str.len() == 1 && new_den_str.len() == 1 {
                          let new_num: f64 = new_num_str.parse().unwrap();
                          let new_den: f64 = new_den_str.parse().unwrap();
                          let orig = num as f64 / den as f64;
                          let new_val = new_num / new_den;
                          if (orig - new_val).abs() < 1e-10 {
                              product_num *= num as u64;
                              product_den *= den as u64;
                          }
                      }
                  }
              }
          }
          let gcd = gcd(product_num, product_den);
          product_den / gcd
      }
      
      fn gcd(a: u64, b: u64) -> u64 {
          if b == 0 {
              a
          } else {
              gcd(b, a % b)
          }
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_033() {
              assert_eq!(digit_cancelling_fractions(), 100);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler033.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem involves "curious" fractions where cancelling a common digit from numerator and denominator results in the same simplified fraction value. For example, 49/98 = 4/8 after cancelling the 9s.

The challenge is to find all non-trivial two-digit fractions less than 1 where this digit cancellation works, then find the denominator of their product in lowest terms.

### Algorithm Analysis

The implementations use brute force enumeration:

- Iterate over all pairs of two-digit numbers (a, b) where 10 ≤ a < b < 100
- For each pair, check if they share a common non-zero digit
- Try cancelling that digit from both numbers
- Verify if the original fraction equals the cancelled fraction
- Collect valid fractions and compute their product
- Reduce the final fraction using GCD

Some implementations hardcode the known fractions for efficiency, while others perform the full search.

### Performance Analysis

- **Time Complexity**: O(1) - bounded by the fixed range of two-digit numbers (8100 pairs total), each requiring constant-time digit manipulation and comparison.
- **Space Complexity**: O(1) - only a few variables needed beyond the input range.
- **Execution Time**: Virtually instantaneous (microseconds), suitable for real-time computation.
- **Scalability**: Fixed problem size, but the approach generalizes to larger digit ranges with linear growth.

### Key Insights

- Only four non-trivial examples exist: 16/64, 19/95, 26/65, and 49/98
- The product of these fractions equals 1/100 in lowest terms
- Trivial examples (like 30/50 = 3/5) are excluded as they involve cancelling trailing zeros
- Digit cancellation is purely coincidental and not mathematically valid simplification

### Educational Value

This problem teaches:
- Fraction arithmetic and equivalence
- The dangers of incorrect mathematical intuition (fallacious cancellation)
- String manipulation and digit processing in programming
- The importance of GCD for fraction reduction
- How brute-force enumeration can solve constrained combinatorial problems
