---
problemNumber: 46
title: "Goldbach's Other Conjecture"
description: |
  It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.
  
  - 9 = 7 + 2 × 1²
  - 15 = 7 + 2 × 2²
  - 21 = 3 + 2 × 3²
  - 25 = 7 + 2 × 3²
  - 27 = 19 + 2 × 2²
  - 33 = 31 + 2 × 1²
  It turns out that the conjecture was false.
  
  What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=46
      
      // It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.
      
      // 9 = 7 + 2×1²
      // 15 = 7 + 2×2²
      // 21 = 3 + 2×3²
      // 25 = 7 + 2×3²
      // 27 = 19 + 2×2²
      // 33 = 31 + 2×1²
      
      // It turns out that the conjecture was false.
      
      // What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
      
      // Answer: 5777
      
      // Authored by: Tim Varley 💘
      
      #include <iostream>
      #include "sieve_eratos.h"
      
      int goldbach_other() {
          const int LIMIT = 10000;
          CSieveOfEratosthenes primes(LIMIT);
          for (int n = 9; ; n += 2) {
              if (!primes.is_prime(n)) { // odd composite
                  bool found = false;
                  for (int p = 2; p < n; ++p) {
                      if (primes.is_prime(p)) {
                          int sq = (n - p) / 2;
                          int k = 1;
                          while (k * k < sq) ++k;
                          if (k * k == sq) {
                              found = true;
                              break;
                          }
                      }
                  }
                  if (!found) return n;
              }
          }
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << goldbach_other() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler046.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      
      public class Solution046 implements Solution {
        public String solve() {
          for (int n = 9; ; n += 2) {
            if (!Prime.isPrime(n)) {
              boolean found = false;
              for (int i = 1; 2 * i * i < n; i++) {
                int p = n - 2 * i * i;
                if (Prime.isPrime(p)) {
                  found = true;
                  break;
                }
              }
              if (!found) {
                return Integer.toString(n);
              }
            }
          }
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution046.java"
  - language: "javascript"
    code: |
      const isPrime = (n) => {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
          if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
      };
      
      const isComposite = (n) => !isPrime(n) && n > 1;
      
      module.exports = {
        answer: () => {
          for (let n = 9; ; n += 2) {
            if (!isComposite(n)) continue;
            let found = false;
            for (let k = 1; 2 * k * k < n; k++) {
              const p = n - 2 * k * k;
              if (isPrime(p)) {
                found = true;
                break;
              }
            }
            if (!found) return n;
          }
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution046.js"
  - language: "python"
    code: |
      def solve():
          """
          Goldbach's Other Conjecture
          It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.
      
          9 = 7 + 2×1²
          15 = 7 + 2×2²
          21 = 3 + 2×3²
          25 = 7 + 2×3²
          27 = 19 + 2×2²
          33 = 31 + 2×1²
      
          It turns out that the conjecture was false.
      
          What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
          https://projecteuler.net/problem=46
          """
          def is_prime(n):
              if n < 2:
                  return False
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      return False
              return True
      
          def is_composite(n):
              return n > 1 and not is_prime(n)
      
          primes = []
          n = 2
          while n < 10000:  # arbitrary limit
              if is_prime(n):
                  primes.append(n)
              n += 1
      
          odd_composite = 9
          while True:
              if is_composite(odd_composite):
                  found = False
                  for p in primes:
                      if p >= odd_composite:
                          break
                      remainder = odd_composite - p
                      if remainder % 2 == 0:
                          s = remainder // 2
                          sqrt_s = int(s**0.5 + 0.5)
                          if sqrt_s * sqrt_s == s:
                              found = True
                              break
                  if not found:
                      return odd_composite
              odd_composite += 2
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler046.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func isPrime(n int) bool {
      	if n <= 1 {
      		return false
      	}
      	if n <= 3 {
      		return true
      	}
      	if n%2 == 0 || n%3 == 0 {
      		return false
      	}
      	for i := 5; i*i <= n; i += 6 {
      		if n%i == 0 || n%(i+2) == 0 {
      			return false
      		}
      	}
      	return true
      }
      
      func main() {
      	primes := []int{}
      	for i := 2; i < 10000; i++ {
      		if isPrime(i) {
      			primes = append(primes, i)
      		}
      	}
      	for n := 9; ; n += 2 {
      		if isPrime(n) {
      			continue
      		}
      		found := false
      		for _, p := range primes {
      			if p >= n {
      				break
      			}
      			rem := n - p
      			if rem%2 == 0 {
      				sq := rem / 2
      				k := 1
      				for k*k < sq {
      					k++
      				}
      				if k*k == sq {
      					found = true
      					break
      				}
      			}
      		}
      		if !found {
      			fmt.Println(n)
      			return
      		}
      	}
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler046.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=46
      //
      // It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.
      // 9 = 7 + 2×1²
      // 15 = 7 + 2×2²
      // 21 = 3 + 2×3²
      // 25 = 7 + 2×3²
      // 27 = 19 + 2×2²
      // 33 = 31 + 2×1²
      // It turns out that the conjecture was false.
      // What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?
      //
      // Answer: 5777
      
      pub fn goldbachs_other_conjecture() -> u64 {
          let mut n = 9;
          loop {
              if !is_prime(n) && n % 2 == 1 {
                  if !can_write_as_prime_plus_twice_square(n) {
                      return n;
                  }
              }
              n += 2;
          }
      }
      
      fn is_prime(n: u64) -> bool {
          if n < 2 { return false; }
          if n == 2 || n == 3 { return true; }
          if n % 2 == 0 || n % 3 == 0 { return false; }
          let mut i = 5;
          while i * i <= n {
              if n % i == 0 || n % (i + 2) == 0 { return false; }
              i += 6;
          }
          true
      }
      
      fn can_write_as_prime_plus_twice_square(n: u64) -> bool {
          let mut p = 2;
          while p < n {
              if is_prime(p) {
                  let diff = n - p;
                  if diff % 2 == 0 {
                      let sq = diff / 2;
                      let root = (sq as f64).sqrt() as u64;
                      if root * root == sq {
                          return true;
                      }
                  }
              }
              p += 1;
          }
          false
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_046() {
              assert_eq!(goldbachs_other_conjecture(), 5777);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler046.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

[Goldbach conjecture](https://grokipedia.com/page/Goldbach_conjecture) states that every even integer greater than 2 can be written as the sum of two primes. This problem deals with "Goldbach's other conjecture": every odd composite number can be written as the sum of a prime and twice a square.

Examples given:
- 9 = 7 + 2×1²
- 15 = 7 + 2×2²
- 21 = 3 + 2×3²
- 25 = 7 + 2×3²
- 27 = 19 + 2×2²
- 33 = 31 + 2×1²

The conjecture is false; the smallest counterexample is 5777.

### Algorithm Analysis

The solution iterates through odd numbers starting from 9, checking if each odd composite can be expressed as p + 2×k² where p is prime and k is integer.

For each odd composite n, it tries all primes p < n, computes the remainder r = n - p, and checks if r/2 is a perfect square.

### Performance Analysis

- **Time Complexity**: O(n²) in the worst case, but finds the answer quickly
- **Space Complexity**: O(1) or O(n) depending on prime storage
- **Execution Time**: Fast for small n (<1 second)
- **Scalability**: Quadratic, but practical for this problem size

### Key Insights

- The counterexample 5777 = 5777, cannot be written in the required form

- All smaller odd composites satisfy the conjecture

- The problem requires checking up to moderately large primes

- Efficient primality testing is crucial

### Educational Value

This problem teaches:

- Number theory and conjectures

- Prime number properties

- Perfect square checking algorithms

- Counterexamples in mathematics

- The relationship between primes and quadratic forms
