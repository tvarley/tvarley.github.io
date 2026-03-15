---
problemNumber: 47
title: "Distinct Primes Factors"
description: |
  The first two consecutive numbers to have two distinct prime factors are:
  
  - 14 = 2 × 7
  - 15 = 3 × 5
  
  The first three consecutive numbers to have three distinct prime factors are:
  
  - 644 = 2² × 7 × 23
  - 645 = 3 × 5 × 43
  - 646 = 2 × 17 × 19
  
  Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=47
      
      // The first two consecutive numbers to have two distinct prime factors are:
      
      // 14 = 2 × 7
      // 15 = 3 × 5.
      
      // The first three consecutive numbers to have three distinct prime factors are:
      
      // 644 = 2² × 7 × 23
      // 645 = 3 × 5 × 43
      // 646 = 2 × 17 × 19.
      
      // Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
      
      // Answer: 134043
      
      // Authored by: Tim Varley 💘
      
      #include <iostream>
      #include <vector>
      #include <set>
      
      int count_distinct_factors(int n) {
          std::set<int> factors;
          int num = n;
          for (int i = 2; i * i <= num; ++i) {
              while (num % i == 0) {
                  factors.insert(i);
                  num /= i;
              }
          }
          if (num > 1) factors.insert(num);
          return factors.size();
      }
      
      int distinct_prime_factors() {
          int n = 2;
          while (true) {
              if (count_distinct_factors(n) == 4 &&
                  count_distinct_factors(n+1) == 4 &&
                  count_distinct_factors(n+2) == 4 &&
                  count_distinct_factors(n+3) == 4) {
                  return n;
              }
              ++n;
          }
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << distinct_prime_factors() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler047.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution047 implements Solution {
        public String solve() {
          for (int n = 2; ; n++) {
            if (distinctPrimeFactors(n) == 4 &&
                distinctPrimeFactors(n + 1) == 4 &&
                distinctPrimeFactors(n + 2) == 4 &&
                distinctPrimeFactors(n + 3) == 4) {
              return Integer.toString(n);
            }
          }
        }
      
        private int distinctPrimeFactors(int n) {
          int count = 0;
          for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
              count++;
              while (n % i == 0) n /= i;
            }
          }
          if (n > 1) count++;
          return count;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution047.java"
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
      
      const distinctPrimeFactors = (n) => {
        const factors = new Set();
        let d = 2;
        while (d * d <= n) {
          while (n % d === 0) {
            factors.add(d);
            n /= d;
          }
          d++;
        }
        if (n > 1) factors.add(n);
        return factors.size;
      };
      
      module.exports = {
        answer: () => {
          let n = 2;
          while (true) {
            if (distinctPrimeFactors(n) === 4 &&
                distinctPrimeFactors(n + 1) === 4 &&
                distinctPrimeFactors(n + 2) === 4 &&
                distinctPrimeFactors(n + 3) === 4) {
              return n;
            }
            n++;
          }
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution047.js"
  - language: "python"
    code: |
      def solve():
          """
          Distinct Primes Factors
          The first two consecutive numbers to have two distinct prime factors are:
      
          14 = 2 × 7
          15 = 3 × 5.
      
          The first three consecutive numbers to have three distinct prime factors are:
      
          644 = 2² × 7 × 23
          645 = 3 × 5 × 43
          646 = 2 × 17 × 19.
      
          Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
          https://projecteuler.net/problem=47
          """
          def distinct_prime_factors(n):
              factors = set()
              i = 2
              while i * i <= n:
                  if n % i == 0:
                      factors.add(i)
                      while n % i == 0:
                          n //= i
                  i += 1
              if n > 1:
                  factors.add(n)
              return len(factors)
      
          n = 2
          while True:
              if (distinct_prime_factors(n) == 4 and
                  distinct_prime_factors(n + 1) == 4 and
                  distinct_prime_factors(n + 2) == 4 and
                  distinct_prime_factors(n + 3) == 4):
                  return n
              n += 1
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler047.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func primeFactors(n int) map[int]int {
      	factors := make(map[int]int)
      	for i := 2; i*i <= n; i++ {
      		for n%i == 0 {
      			factors[i]++
      			n /= i
      		}
      	}
      	if n > 1 {
      		factors[n]++
      	}
      	return factors
      }
      
      func main() {
      	n := 2
      	for {
      		if len(primeFactors(n)) == 4 && len(primeFactors(n+1)) == 4 && len(primeFactors(n+2)) == 4 && len(primeFactors(n+3)) == 4 {
      			fmt.Println(n)
      			return
      		}
      		n++
      	}
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler047.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=47
      //
      // The first two consecutive numbers to have two distinct prime factors are:
      // 14 = 2 × 7
      // 15 = 3 × 5.
      // The first three consecutive numbers to have three distinct prime factors are:
      // 644 = 2² × 7 × 23
      // 645 = 3 × 5 × 43
      // 646 = 2 × 17 × 19.
      // Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?
      //
      // Answer: 134043
      
      pub fn distinct_primes_factors() -> u64 {
          let mut n = 2;
          loop {
              if count_distinct_prime_factors(n) == 4 &&
                 count_distinct_prime_factors(n + 1) == 4 &&
                 count_distinct_prime_factors(n + 2) == 4 &&
                 count_distinct_prime_factors(n + 3) == 4 {
                  return n;
              }
              n += 1;
          }
      }
      
      fn count_distinct_prime_factors(mut n: u64) -> usize {
          let mut count = 0;
          if n % 2 == 0 {
              count += 1;
              while n % 2 == 0 {
                  n /= 2;
              }
          }
          let mut i = 3;
          while i * i <= n {
              if n % i == 0 {
                  count += 1;
                  while n % i == 0 {
                      n /= i;
                  }
              }
              i += 2;
          }
          if n > 1 {
              count += 1;
          }
          count
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_047() {
              assert_eq!(distinct_primes_factors(), 134043);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler047.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The problem asks for the first of four consecutive integers where each has exactly four distinct prime factors.

Examples given:
- Two consecutive with two factors: 14 = 2×7, 15 = 3×5
- Three consecutive with three factors: 644 = 2²×7×23, 645 = 3×5×43, 646 = 2×17×19

### Algorithm Analysis

The solution iterates through numbers, checking consecutive groups. For each number, it counts distinct prime factors by trial division.

It maintains a sliding window of four consecutive numbers, checking if all have exactly four distinct prime factors.

### Performance Analysis

- **Time Complexity**: O(n × √n) where n is the numbers checked
- **Space Complexity**: O(1) 
- **Execution Time**: Moderate, finds answer in reasonable time
- **Scalability**: Linear in search range, efficient for this problem

### Key Insights

- Numbers with many small prime factors are more likely to have multiple factors

- The sequence starts at 134043 (134043, 134044, 134045, 134046)

- Each has exactly four distinct prime factors

- No smaller sequence exists

### Educational Value

This problem teaches:

- Prime factorization algorithms

- Factor counting techniques

- Searching for number sequences with specific properties

- The distribution of numbers with given numbers of prime factors
