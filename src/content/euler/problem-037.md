---
problemNumber: 37
title: "Truncatable Primes"
description: |
  The number $3797$ has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: $3797$, $797$, $97$, and $7$. Similarly we can work from right to left: $3797$, $379$, $37$, and $3$.
  
  Find the sum of the only eleven primes that are both truncatable from left to right and right to left.
  
  <p class="smaller">NOTE: $2$, $3$, $5$, and $7$ are not considered to be truncatable primes.
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 748317
      
      #include <iostream>
      #include <vector>
      #include <string>
      
      int truncatable_primes() {
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
          int sum = 0;
          int count = 0;
          for(int n=11; n<MAX && count<11; n++) {
              if(!is_prime[n]) continue;
              std::string s = std::to_string(n);
              bool left_ok = true;
              for(size_t len=1; len<s.size(); len++) {
                  std::string left = s.substr(len);
                  int lnum = std::stoi(left);
                  if(!is_prime[lnum]) {left_ok=false; break;}
              }
              if(!left_ok) continue;
              bool right_ok = true;
              for(int len=s.size()-1; len>0; len--) {
                  std::string right = s.substr(0,len);
                  int rnum = std::stoi(right);
                  if(!is_prime[rnum]) {right_ok=false; break;}
              }
              if(right_ok) {
                  sum += n;
                  count++;
              }
          }
          return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << truncatable_primes() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler037.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      
      public class Solution037 implements Solution {
        public String solve() {
          long sum = 0;
          int count = 0;
          int i = 11;
          while (count < 11) {
            if (Prime.isPrime(i) && isTruncatable(i)) {
              sum += i;
              count++;
            }
            i += 2;
          }
          return Long.toString(sum);
        }
      
        private boolean isTruncatable(int n) {
          String s = Integer.toString(n);
          for (int j = 1; j < s.length(); j++) {
            if (!Prime.isPrime(Integer.parseInt(s.substring(j)))) return false;
          }
          for (int j = s.length() - 1; j > 0; j--) {
            if (!Prime.isPrime(Integer.parseInt(s.substring(0, j)))) return false;
          }
          return true;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution037.java"
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
      
          function isTruncatable(p) {
            const s = p.toString();
            // left truncate
            for (let i = 1; i < s.length; i++) {
              if (!primes.has(parseInt(s.slice(i)))) return false;
            }
            // right truncate
            for (let i = s.length - 1; i > 0; i--) {
              if (!primes.has(parseInt(s.slice(0, i)))) return false;
            }
            return true;
          }
      
          let sum = 0;
          let count = 0;
          for (const p of primes) {
            if (p > 7 && isTruncatable(p)) {
              sum += p;
              count++;
              if (count === 11) break;
            }
          }
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution037.js"
  - language: "python"
    code: |
      def solve():
          """
          Truncatable Primes
          The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.
      
          Find the sum of the only eleven primes that are both truncatable from left to right and right to left.
      
          NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.
          https://projecteuler.net/problem=37
          """
          def is_prime(n):
              if n < 2:
                  return False
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      return False
              return True
      
          def truncatable_left(n):
              s = str(n)
              for i in range(1, len(s)):
                  if not is_prime(int(s[i:])):
                      return False
              return True
      
          def truncatable_right(n):
              s = str(n)
              for i in range(1, len(s)):
                  if not is_prime(int(s[:-i])):
                      return False
              return True
      
          truncatable_primes = []
          n = 11
          while len(truncatable_primes) < 11:
              if is_prime(n) and truncatable_left(n) and truncatable_right(n):
                  truncatable_primes.append(n)
              n += 2
          return sum(truncatable_primes)
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler037.py"
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
      
      func isTruncatable(p int) bool {
      	s := strconv.Itoa(p)
      	// left to right
      	for i := 1; i < len(s); i++ {
      		left, _ := strconv.Atoi(s[i:])
      		if !isPrime(left) {
      			return false
      		}
      	}
      	// right to left
      	for i := len(s) - 1; i > 0; i-- {
      		right, _ := strconv.Atoi(s[:i])
      		if !isPrime(right) {
      			return false
      		}
      	}
      	return true
      }
      
      func main() {
      	sum := 0
      	count := 0
      	n := 11
      	for count < 11 {
      		if isPrime(n) && isTruncatable(n) {
      			sum += n
      			count++
      		}
      		n += 2
      	}
      	fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler037.go"
  - language: "rust"
    code: |
      // Answer: 748317
      
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
      
      pub fn truncatable_primes() -> u64 {
          let mut sum = 0;
          let mut count = 0;
          let mut n = 11;
          while count < 11 {
              if is_prime(n) {
                  let s = format!("{}", n);
                  let mut left_ok = true;
                  let mut right_ok = true;
                  for i in 1..s.len() {
                      let trunc: u64 = s[i..].parse().unwrap();
                      if !is_prime(trunc) {
                          left_ok = false;
                          break;
                      }
                  }
                  for i in (1..s.len()).rev() {
                      let trunc: u64 = s[0..i].parse().unwrap();
                      if !is_prime(trunc) {
                          right_ok = false;
                          break;
                      }
                  }
                  if left_ok && right_ok {
                      sum += n;
                      count += 1;
                  }
              }
              n += 2;
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_037() {
              assert_eq!(truncatable_primes(), 748317);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler037.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A truncatable prime remains prime when digits are successively removed from either end. For example, 3797 is truncatable because 3797, 797, 97, 7 are all prime (left truncation), and 3797, 379, 37, 3 are all prime (right truncation).

Single-digit primes (2, 3, 5, 7) are excluded by definition.

### Algorithm Analysis

The implementations use the Sieve of Eratosthenes combined with truncation checking:

- Generate primes up to 1,000,000 using sieve
- For each prime ≥ 11, check all left truncations (remove digits from left)
- Check all right truncations (remove digits from right)
- Sum the first 11 primes that satisfy both conditions

Truncation uses string slicing and primality testing.

### Performance Analysis

- **Time Complexity**: O(n log log n) for sieve + O(π(n) × d × √n) for truncation checks, where π(n) ~ 78,000 and d ~ 6. Total ~10^7 operations, executes in seconds.
- **Space Complexity**: O(n) for the sieve array (1M booleans).
- **Execution Time**: Fast (1-2 seconds), suitable for batch processing.
- **Scalability**: Linear in n for sieve, but primality checks dominate for large n.

### Key Insights

- There are exactly 11 such primes, summing to 748,317
- All truncatable primes must end with 3, 7, or 9 (can't end with even digit or 5)
- Must start with 2, 3, 5, or 7 (can't start with even digit or 5)
- The sieve enables O(1) primality lookups for efficiency

### Educational Value

This problem teaches:
- Advanced prime properties and number theory
- String manipulation and substring operations
- Combining multiple algorithmic techniques
- The importance of precomputation (sieve) for performance
- Systematic checking of multiple conditions
