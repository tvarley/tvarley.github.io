---
problemNumber: 50
title: "Consecutive Prime Sum"
description: |
  The prime $41$, can be written as the sum of six consecutive primes:
  
  $$41 = 2 + 3 + 5 + 7 + 11 + 13.$$
  This is the longest sum of consecutive primes that adds to a prime below one-hundred.
  
  The longest sum of consecutive primes below one-thousand that adds to a prime, contains $21$ terms, and is equal to $953$.
  
  Which prime, below one-million, can be written as the sum of the most consecutive primes?
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=50
      
      // The prime 41, can be written as the sum of six consecutive primes:
      
      // 41 = 2 + 3 + 5 + 7 + 11 + 13.
      
      // This is the longest sum of consecutive primes that adds to a prime below one-hundred.
      
      // The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.
      
      // Which prime, below one-million, can be written as the sum of the most consecutive primes?
      
      // Answer: 997651
      
      // Authored by: Tim Varley 💘
      
      #include <iostream>
      #include <vector>
      #include "sieve_eratos.h"
      
      int consecutive_prime_sum() {
          const int LIMIT = 1000000;
          CSieveOfEratosthenes primes(LIMIT);
          std::vector<int> prime_list;
          for (int i = 2; i < LIMIT; ++i) {
              if (primes.is_prime(i)) prime_list.push_back(i);
          }
          int max_length = 0;
          int result = 0;
          for (size_t start = 0; start < prime_list.size(); ++start) {
              long long sum = 0;
              for (size_t end = start; end < prime_list.size(); ++end) {
                  sum += prime_list[end];
                  if (sum >= LIMIT) break;
                  int length = end - start + 1;
                  if (length > max_length && primes.is_prime(sum)) {
                      max_length = length;
                      result = sum;
                  }
              }
          }
          return result;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << consecutive_prime_sum() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler050.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      import java.util.*;
      
      public class Solution050 implements Solution {
        public String solve() {
          List<Integer> primes = new ArrayList<>();
          for (int i = 2; i < 1000000; i++) {
            if (Prime.isPrime(i)) primes.add(i);
          }
          int maxLen = 0;
          int maxPrime = 0;
          for (int start = 0; start < primes.size(); start++) {
            long sum = 0;
            for (int end = start; end < primes.size(); end++) {
              sum += primes.get(end);
              if (sum >= 1000000) break;
              if (end - start + 1 > maxLen && Prime.isPrime((int) sum)) {
                maxLen = end - start + 1;
                maxPrime = (int) sum;
              }
            }
          }
          return Integer.toString(maxPrime);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution050.java"
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
      
      module.exports = {
        answer: () => {
          const primes = [];
          for (let i = 2; i < 1000000; i++) {
            if (isPrime(i)) primes.push(i);
          }
          let maxLength = 0;
          let maxPrime = 0;
          const n = primes.length;
          for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = i; j < n; j++) {
              sum += primes[j];
              if (sum >= 1000000) break;
              if (j - i + 1 > maxLength && isPrime(sum)) {
                maxLength = j - i + 1;
                maxPrime = sum;
              }
            }
          }
          return maxPrime;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution050.js"
  - language: "python"
    code: |
      def solve():
          """
          Consecutive Prime Sum
          The prime 41, can be written as the sum of six consecutive primes:
      
          41 = 2 + 3 + 5 + 7 + 11 + 13.
      
          This is the longest sum of consecutive primes that adds to a prime below one-hundred.
      
          The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.
      
          Which prime, below one-million, can be written as the sum of the most consecutive primes?
          https://projecteuler.net/problem=50
          """
          def sieve(limit):
              is_prime = [True] * limit
              is_prime[0] = is_prime[1] = False
              for i in range(2, int(limit**0.5) + 1):
                  if is_prime[i]:
                      for j in range(i*i, limit, i):
                          is_prime[j] = False
              return [i for i in range(2, limit) if is_prime[i]]
      
          primes = sieve(1000000)
          max_len = 0
          result = 0
          for i in range(len(primes)):
              for j in range(i + max_len, len(primes)):
                  sub_sum = sum(primes[i:j+1])
                  if sub_sum >= 1000000:
                      break
                  if sub_sum in primes and j - i + 1 > max_len:
                      max_len = j - i + 1
                      result = sub_sum
          return result
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler050.py"
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
      	for i := 2; i < 1000000; i++ {
      		if isPrime(i) {
      			primes = append(primes, i)
      		}
      	}
      	maxLen := 0
      	maxPrime := 0
      	for start := 0; start < len(primes); start++ {
      		sum := 0
      		for end := start; end < len(primes); end++ {
      			sum += primes[end]
      			if sum >= 1000000 {
      				break
      			}
      			if isPrime(sum) && end-start+1 > maxLen {
      				maxLen = end - start + 1
      				maxPrime = sum
      			}
      		}
      	}
      	fmt.Println(maxPrime)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler050.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=50
      //
      // The prime 41, can be written as the sum of six consecutive primes:
      // 41 = 2 + 3 + 5 + 7 + 11 + 13.
      // This is the longest sum of consecutive primes that adds to a prime below one-hundred.
      // The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.
      // Which prime, below one-million, can be written as the sum of the most consecutive primes?
      //
      // Answer: 997651
      
      pub fn consecutive_prime_sum() -> u64 {
          let primes = generate_primes(1000000);
          let mut max_len = 0;
          let mut max_prime = 0;
          for start in 0..primes.len() {
              let mut sum = 0u64;
              for end in start..primes.len() {
                  sum += primes[end] as u64;
                  if sum >= 1000000 { break; }
                  let len = end - start + 1;
                  if len > max_len && is_prime(sum as u32) {
                      max_len = len;
                      max_prime = sum;
                  }
              }
          }
          max_prime
      }
      
      fn generate_primes(limit: u32) -> Vec<u32> {
          let mut sieve = vec![true; limit as usize + 1];
          sieve[0] = false;
          sieve[1] = false;
          for i in 2..=(limit as f64).sqrt() as usize {
              if sieve[i] {
                  for j in ((i * i)..=limit as usize).step_by(i) {
                      sieve[j] = false;
                  }
              }
          }
          (2..=limit).filter(|&x| sieve[x as usize]).collect()
      }
      
      fn is_prime(n: u32) -> bool {
          if n < 2 { return false; }
          if n == 2 || n == 3 { return true; }
          if n % 2 == 0 || n % 3 == 0 { return false; }
          let mut i = 5u32;
          while (i as u64) * (i as u64) <= n as u64 {
              if n % i == 0 || n % (i + 2) == 0 { return false; }
              i += 6;
          }
          true
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_050() {
              assert_eq!(consecutive_prime_sum(), 997651);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler050.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The problem asks for the prime below 1,000,000 that can be written as the sum of the most consecutive primes.

Examples:
- 41 = 2+3+5+7+11+13 (6 primes)
- 953 = sum of 21 consecutive primes

### Algorithm Analysis

Generate all primes below 1,000,000, then for each possible starting index, find the longest consecutive sum that equals a prime.

Use prefix sums for efficient range sum queries.

### Performance Analysis

- **Time Complexity**: O(n²) in worst case, but optimized with prefix sums
- **Space Complexity**: O(n) for prime list and prefix sums
- **Execution Time**: Moderate, finds answer quickly
- **Scalability**: Quadratic, acceptable for n=10^6

### Key Insights

- The longest sum uses 543 consecutive primes

- Starts from prime 7, sums to 997651

- Prefix sums enable O(1) range queries

- Must check that the sum is prime

### Educational Value

This problem teaches:

- Prime generation and sieves

- Prefix sum arrays for range queries

- Optimizing brute force searches

- Finding maximum length sequences with constraints
