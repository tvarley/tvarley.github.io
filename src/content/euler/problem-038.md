---
problemNumber: 38
title: "Pandigital Multiples"
description: |
  Take the number $192$ and multiply it by each of $1$, $2$, and $3$:
  
  $$\begin{align}
  192 \times 1 &= 192\\
  192 \times 2 &= 384\\
  192 \times 3 &= 576
  \end{align}$$
  By concatenating each product we get the $1$ to $9$ pandigital, $192384576$. We will call $192384576$ the concatenated product of $192$ and $(1,2,3)$.
  
  The same can be achieved by starting with $9$ and multiplying by $1$, $2$, $3$, $4$, and $5$, giving the pandigital, $918273645$, which is the concatenated product of $9$ and $(1,2,3,4,5)$.
  
  What is the largest $1$ to $9$ pandigital $9$-digit number that can be formed as the concatenated product of an integer with $(1,2, \dots, n)$ where $n \gt 1$?
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 932718654
      
      // Authored by: Tim Varley 💘
      // Assisted-by: Grok Code Fast via Crush 💘 <crush@charm.land>
      
      #include <iostream>
      #include <vector>
      #include <string>
      #include <algorithm>
      
      long long pandigital_multiples() {
          long long max_pandigital = 0;
          for(int x=1; x<10000; x++) {
              std::string concat = "";
              for(int k=1; ; k++) {
                  concat += std::to_string(x * k);
                  if(concat.size() > 9) break;
                  if(concat.size() == 9) {
                      std::string check = "123456789";
                      std::string sorted = concat;
                      std::sort(sorted.begin(), sorted.end());
                      if(sorted == check) {
                          long long num = std::stoll(concat);
                          if(num > max_pandigital) max_pandigital = num;
                      }
                      break;
                  }
              }
          }
          return max_pandigital;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << pandigital_multiples() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler038.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution038 implements Solution {
        public String solve() {
          int max = 0;
          for (int i = 1; i < 10000; i++) {
            String concat = "";
            int n = 1;
            while (concat.length() < 9) {
              concat += Integer.toString(i * n);
              n++;
            }
            if (concat.length() == 9 && isPandigital(concat) && Integer.parseInt(concat) > max) max = Integer.parseInt(concat);
          }
          return Integer.toString(max);
        }
      
        private boolean isPandigital(String s) {
          if (s.length() != 9) return false;
          boolean[] used = new boolean[10];
          for (char c : s.toCharArray()) {
            int d = c - '0';
            if (d == 0 || used[d]) return false;
            used[d] = true;
          }
          return true;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution038.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          function isPandigital(s) {
            if (s.length !== 9 || s.includes('0')) return false;
            return new Set(s).size === 9;
          }
      
          let max = 0;
          for (let x = 1; x < 100000; x++) {
            let concat = '';
            let n = 1;
            while (concat.length < 9) {
              concat += (x * n).toString();
              n++;
              if (concat.length > 9) break;
            }
            if (concat.length === 9 && isPandigital(concat)) {
              const num = parseInt(concat);
              if (num > max) max = num;
            }
          }
          return max;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution038.js"
  - language: "python"
    code: |
      def solve():
          """
          Pandigital Multiples
          Take the number 192 and multiply it by each of 1, 2, and 3:
      
          192 × 1 = 192
          192 × 2 = 384
          192 × 3 = 576
      
          By concatenating each product we get the 1 to 9 pandigital, 192384576. We will call 192384576 the concatenated product of 192 and (1,2,3).
      
          The same can be achieved by starting with 9 and multiplying by 1, 2, 3, 4, and 5, giving the pandigital, 918273645, which is the concatenated product of 9 and (1,2,3,4,5).
      
          What is the largest 1 to 9 pandigital 9-digit number that can be formed as the concatenated product of an integer with (1,2, …, n) where n > 1?
          https://projecteuler.net/problem=38
          """
          def is_pandigital(s):
              return len(s) == 9 and set(s) == set('123456789')
      
          max_pandigital = 0
          for n in range(1, 10000):  # reasonable upper limit
              concatenated = ''
              multiplier = 1
              while len(concatenated) < 9:
                  concatenated += str(n * multiplier)
                  multiplier += 1
                  if len(concatenated) == 9 and is_pandigital(concatenated):
                      max_pandigital = max(max_pandigital, int(concatenated))
                      break
                  elif len(concatenated) > 9:
                      break
          return max_pandigital
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler038.py"
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
      	max := 0
      	for n := 1; n < 10000; n++ {
      		s := ""
      		for i := 1; ; i++ {
      			s += strconv.Itoa(n * i)
      			if len(s) > 9 {
      				break
      			}
      			if len(s) == 9 && isPandigital(s) {
      				p, _ := strconv.Atoi(s)
      				if p > max {
      					max = p
      				}
      				break
      			}
      		}
      	}
      	fmt.Println(max)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler038.go"
  - language: "rust"
    code: |
      // Answer: 932718654
      
      pub fn pandigital_multiples() -> u64 {
          let mut max = 0;
          for n in (1..10000).rev() {
              let mut s = String::new();
              let mut k = 1;
              while s.len() < 9 {
                  s += &format!("{}", n * k);
                  k += 1;
              }
              if s.len() == 9 {
                  let mut digits = [0; 10];
                  let mut ok = true;
                  for c in s.chars() {
                      let d = c.to_digit(10).unwrap() as usize;
                      if d == 0 || digits[d] > 0 {
                          ok = false;
                          break;
                      }
                      digits[d] = 1;
                  }
                  if ok {
                      let num: u64 = s.parse().unwrap();
                      if num > max {
                          max = num;
                      }
                  }
              }
          }
          max
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_038() {
              assert_eq!(pandigital_multiples(), 932718654);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler038.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A pandigital number uses each digit from 1 to n exactly once. Here we seek 9-digit pandigital numbers formed by concatenating multiples of a base number.

For example, 192 × (1,2,3) = 192, 384, 576 → 192384576 (pandigital).

We need the largest such number where n > 1 (at least two multiples concatenated).

### Algorithm Analysis

The implementations use brute force enumeration:

- Iterate through possible base numbers (1 to 9999)
- For each base, concatenate multiples (×1, ×2, ×3, ...) until reaching 9 digits
- Check if exactly 9 digits and contains each digit 1-9 exactly once
- Track the maximum valid number found

Pandigital check uses digit counting or set operations.

### Performance Analysis

- **Time Complexity**: O(U × k) where U=10,000 and k~5 (average concatenations needed), resulting in ~50,000 operations. Executes instantly.
- **Space Complexity**: O(1) - only strings for current concatenation.
- **Execution Time**: Very fast (milliseconds), suitable for real-time applications.
- **Scalability**: Linear in upper bound, but fixed by pandigital constraint.

### Key Insights

- Largest pandigital multiple is 9,327,186,54
- Base numbers must be chosen so concatenation yields exactly 9 digits
- Cannot contain zero or repeated digits
- Starting from higher base numbers finds larger results faster

### Educational Value

This problem teaches:
- String concatenation and manipulation
- Set operations for uniqueness checking
- The concept of pandigital numbers
- Systematic search with constraints
- Optimization by starting from high values
