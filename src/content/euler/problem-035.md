---
problemNumber: 35
title: "Circular Primes"
description: |
  The number, $197$, is called a circular prime because all rotations of the digits: $197$, $971$, and $719$, are themselves prime.
  
  There are thirteen such primes below $100$: $2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79$, and $97$.
  
  How many circular primes are there below one million?
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 55
      
      #include <iostream>
      #include <vector>
      #include <string>
      
      int circular_primes() {
          const int MAX = 1000000;
          std::vector<bool> is_prime(MAX+1, true);
          is_prime[0] = is_prime[1] = false;
          for(long long i=2; i*i<=MAX; i++) {
              if(is_prime[i]) {
                  for(long long j=i*i; j<=MAX; j+=i) {
                      is_prime[j] = false;
                  }
              }
          }
          int count = 0;
          for(int n=2; n<MAX; n++) {
              if(!is_prime[n]) continue;
              std::string s = std::to_string(n);
              bool all_prime = true;
              for(size_t rot=1; rot<s.size(); rot++) {
                  std::string r = s.substr(rot) + s.substr(0,rot);
                  int rn = std::stoi(r);
                  if(!is_prime[rn]) { all_prime=false; break; }
              }
              if(all_prime) count++;
          }
          return count;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << circular_primes() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler035.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      
      public class Solution035 implements Solution {
        public String solve() {
          int count = 0;
          for (int i = 2; i < 1000000; i++) {
            if (Prime.isPrime(i) && isCircular(i)) count++;
          }
          return Integer.toString(count);
        }
      
        private boolean isCircular(int n) {
          String s = Integer.toString(n);
          for (int i = 0; i < s.length(); i++) {
            String rot = s.substring(i) + s.substring(0, i);
            if (!Prime.isPrime(Integer.parseInt(rot))) return false;
          }
          return true;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution035.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          const limit = 1000000;
          const sieve = new Array(limit).fill(true);
          sieve[0] = sieve[1] = false;
          for (let i = 2; i * i < limit; i++) {
            if (sieve[i]) {
              for (let j = i * i; j < limit; j += i) {
                sieve[j] = false;
              }
            }
          }
          const primes = new Set();
          for (let i = 2; i < limit; i++) {
            if (sieve[i]) primes.add(i);
          }
      
          function isCircular(p) {
            const s = p.toString();
            for (let i = 0; i < s.length; i++) {
              const rotated = s.slice(i) + s.slice(0, i);
              if (!primes.has(parseInt(rotated))) return false;
            }
            return true;
          }
      
          let count = 0;
          for (const p of primes) {
            if (p < 10 || isCircular(p)) count++;
          }
          return count;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution035.js"
  - language: "python"
    code: |
      def solve():
          """
          Circular Primes
          The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.
      
          There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.
      
          How many circular primes are there below one million?
          https://projecteuler.net/problem=35
          """
          def is_prime(n):
              if n < 2:
                  return False
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      return False
              return True
      
          def rotations(n):
              s = str(n)
              return [int(s[i:] + s[:i]) for i in range(len(s))]
      
          count = 0
          for n in range(2, 1000000):
              if all(is_prime(r) for r in rotations(n)):
                  count += 1
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler035.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "strconv"
      
      func isPrime(n int) bool {
      	if n < 2 {
      		return false
      	}
      	for i := 2; i*i <= n; i++ {
      		if n%i == 0 {
      			return false
      		}
      	}
      	return true
      }
      
      func rotations(s string) []string {
      	res := []string{}
      	for i := 0; i < len(s); i++ {
      		res = append(res, s[i:]+s[:i])
      	}
      	return res
      }
      
      func main() {
      	count := 0
      	for n := 2; n < 1000000; n++ {
      		if !isPrime(n) {
      			continue
      		}
      		s := strconv.Itoa(n)
      		allPrime := true
      		for _, rot := range rotations(s) {
      			r, _ := strconv.Atoi(rot)
      			if !isPrime(r) {
      				allPrime = false
      				break
      			}
      		}
      		if allPrime {
      			count++
      		}
      	}
      	fmt.Println(count)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler035.go"
  - language: "rust"
    code: |
      // Answer: 55
      
      fn is_prime(n: u64) -> bool {
          if n < 2 {
              return false;
          }
          if n == 2 || n == 3 {
              return true;
          }
          if n % 2 == 0 || n % 3 == 0 {
              return false;
          }
          let mut i = 5;
          while i * i <= n {
              if n % i == 0 || n % (i + 2) == 0 {
                  return false;
              }
              i += 6;
          }
          true
      }
      
      pub fn circular_primes() -> u64 {
          let mut count = 0;
          for n in 2..1_000_000 {
              if is_prime(n) {
                  let s = format!("{}", n);
                  let mut is_circular = true;
                  for i in 0..s.len() {
                      let rotated: String = s[i..].to_string() + &s[0..i];
                      let r: u64 = rotated.parse().unwrap();
                      if !is_prime(r) {
                          is_circular = false;
                          break;
                      }
                  }
                  if is_circular {
                      count += 1;
                  }
              }
          }
          count
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_035() {
              assert_eq!(circular_primes(), 55);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler035.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A circular prime is a prime number where all rotations of its digits are also prime. For example, 197 → 971 → 719, all prime.

This requires checking that every cyclic permutation of the digits forms a prime number, excluding leading zeros in rotations.

### Algorithm Analysis

The implementations combine the Sieve of Eratosthenes with rotation checking:

- Generate all primes below 1,000,000 using the sieve
- For each prime, generate all digit rotations
- Check if every rotation is also prime
- Count primes that satisfy this property

Single-digit primes (2, 3, 5, 7) are circular by definition.

### Performance Analysis

- **Time Complexity**: O(n log log n) for sieve + O(π(n) × d × √n) for rotation checks, where π(n) is prime-counting function (~78,000 for n=1M) and d is digits (~6). Total ~10^7 operations, executes in seconds.
- **Space Complexity**: O(n) for the sieve array (1M booleans).
- **Execution Time**: Fast (1-2 seconds), suitable for batch processing.
- **Scalability**: Linear in n for sieve, but rotation checks grow with number of primes.

### Key Insights

- There are 55 circular primes below 1,000,000
- All single-digit primes are circular
- Numbers containing even digits or 5 (except as first digit) cannot be circular primes
- The sieve enables O(1) primality lookups for rotations

### Educational Value

This problem teaches:
- The Sieve of Eratosthenes for prime generation
- String rotation algorithms and cyclic permutations
- Combining multiple algorithmic techniques
- The properties of primes and digit patterns
- Optimization through precomputation and lookup tables
