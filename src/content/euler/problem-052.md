---
problemNumber: 52
title: "Permuted multiples"
description: |
  It can be seen that the number, $125874$, and its double, $251748$, contain exactly the same digits, but in a different order.

  Find the smallest positive integer, $x$, such that $2x$, $3x$, $4x$, $5x$, and $6x$, contain the same digits.
difficulty: "medium"
date: 2026-03-20
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=52
      // Permuted Multiples
      // It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
      // Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
      // Answer: 142857

      #include <iostream>
      #include <string>
      #include <algorithm>

      bool same_digits(long long a, long long b) {
          std::string sa = std::to_string(a);
          std::string sb = std::to_string(b);
          if (sa.size() != sb.size()) return false;
          std::sort(sa.begin(), sa.end());
          std::sort(sb.begin(), sb.end());
          return sa == sb;
      }

      long long permuted_multiples() {
          long long x = 1;
          while (true) {
              bool ok = true;
              for (int m = 2; m <= 6; ++m) {
                  if (!same_digits(x, x * m)) {
                      ok = false;
                      break;
                  }
              }
              if (ok) return x;
              ++x;
          }
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << permuted_multiples() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler052.cpp"
    performance: "O(n) time complexity"
  - language: "go"
    code: |
      package main

      import (
      	"fmt"
      	"sort"
      	"strconv"
      )

      func hasSameDigits(a, b int) bool {
      	sa := strconv.Itoa(a)
      	sb := strconv.Itoa(b)
      	if len(sa) != len(sb) {
      		return false
      	}
      	da := []byte(sa)
      	db := []byte(sb)
      	sort.Slice(da, func(i, j int) bool { return da[i] < da[j] })
      	sort.Slice(db, func(i, j int) bool { return db[i] < db[j] })
      	return string(da) == string(db)
      }

      func main() {
      	for x := 1; ; x++ {
      		allSame := true
      		for mul := 2; mul <= 6; mul++ {
      			if !hasSameDigits(x, x*mul) {
      				allSame = false
      				break
      			}
      		}
      		if allSame {
      			fmt.Println(x)
      			break
      		}
      	}
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler052.go"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.util.*;

      public class Solution052 implements Solution {
        public String solve() {
          for (int x = 1; ; x++) {
            String s = Integer.toString(x);
            char[] digits = s.toCharArray();
            Arrays.sort(digits);
            boolean allSame = true;
            for (int mul = 2; mul <= 6; mul++) {
              String ms = Integer.toString(x * mul);
              if (ms.length() != s.length()) {
                allSame = false;
                break;
              }
              char[] mDigits = ms.toCharArray();
              Arrays.sort(mDigits);
              if (!Arrays.equals(digits, mDigits)) {
                allSame = false;
                break;
              }
            }
            if (allSame) {
              return Integer.toString(x);
            }
          }
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution052.java"
  - language: "javascript"
    code: |
      // https://projecteuler.net/problem=52
      // Permuted Multiples
      // It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
      // Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
      // The final answer to the problem is 142857.

      const hasSameDigits = (a, b) => {
        return a.toString().split('').sort().join('') === b.toString().split('').sort().join('');
      };

      module.exports = {
        answer: () => {
          for (let x = 1; ; x++) {
            if (hasSameDigits(x, 2 * x) &&
                hasSameDigits(x, 3 * x) &&
                hasSameDigits(x, 4 * x) &&
                hasSameDigits(x, 5 * x) &&
                hasSameDigits(x, 6 * x)) {
              return x;
            }
          }
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution052.js"
  - language: "python"
    code: |
      # https://projecteuler.net/problem=52
      # Permuted Multiples
      # It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
      # Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
      # Answer: 142857
      def solve():
          x = 100000
          while True:
              digits = sorted(str(x))
              if all(sorted(str(k * x)) == digits for k in range(2, 7)):
                  return x
              x += 1
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler052.py"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=52
      //
      // It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.
      // Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.
      //
      // Answer: 142857

      pub fn permuted_multiples() -> u64 {
          for x in 1.. {
              let x_str = x.to_string();
              let mut digits: Vec<char> = x_str.chars().collect();
              digits.sort();
              let mut all_same = true;
              for mul in 2..=6 {
                  let mx = x * mul;
                  let mx_str = mx.to_string();
                  if mx_str.len() != x_str.len() { all_same = false; break; }
                  let mut mx_digits: Vec<char> = mx_str.chars().collect();
                  mx_digits.sort();
                  if mx_digits != digits { all_same = false; break; }
              }
              if all_same { return x; }
          }
          0
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_052() {
              assert_eq!(permuted_multiples(), 142857);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler052.rs"
tags: ["euler"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Delves into [digit permutations](https://grokipedia.com/page/Permutation) and [cyclic numbers](https://grokipedia.com/page/Cyclic_number), where multiples preserve digit sets—famously linked to the 142857 cycle from 1/7 = 0.142857142857...

### Algorithm Analysis

Brute-force incremental search with sorted-digit comparison for multiples 2x-6x. Early termination on first match keeps it efficient despite appearing O(n).

### Key Insights

- 142857 * 1 = 142857
- 142857 * 2 = 285714
- ... up to *6 = 857142 (all permutations)
- Discovered via systematic digit equality checks

### Educational Value

Highlights connections between number theory, fractions, and programming. Demonstrates how simple string/digit tricks reveal profound mathematical patterns like cyclic properties in base 10. Fascinating bridge to recreational math and Project Euler's elegance.