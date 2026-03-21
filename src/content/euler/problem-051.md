---
problemNumber: 51
title: "Prime digit replacements"
description: |
  By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

  By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.

  Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
difficulty: "hard"
date: 2026-03-20
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=51
      // Prime Digit Replacements
      // By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
      // By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.
      // Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
      // Answer: 121313

      #include <iostream>
      #include <vector>
      #include <string>
      #include <unordered_set>
      #include <algorithm>
      #include "sieve_eratos.h"

      bool is_prime(const CSieveOfEratosthenes& sieve, int n) {
          return sieve.is_prime(n);
      }

      int prime_digit_replacements() {
          const int LIMIT = 1000000;
          CSieveOfEratosthenes sieve(LIMIT);
          std::vector<int> primes;
          for (int i = 2; i < LIMIT; ++i) {
              if (sieve.is_prime(i)) primes.push_back(i);
          }
          int result = -1;
          for (int p : primes) {
              if (p < 100000) continue;
              std::string s = std::to_string(p);
              int len = s.size();
              for (int mask = 1; mask < (1 << len); ++mask) {
                  std::vector<int> family;
                  for (int d = 0; d < 10; ++d) {
                      if (d == 0 && (mask & 1)) continue;
                      std::string news = s;
                      for (int i = 0; i < len; ++i) {
                          if (mask & (1 << i)) {
                              news[i] = '0' + d;
                          }
                      }
                      int num = std::stoi(news);
                      if (sieve.is_prime(num)) {
                          family.push_back(num);
                      }
                  }
                  if (family.size() == 8) {
                      int min_in_family = *std::min_element(family.begin(), family.end());
                      if (result == -1 || min_in_family < result) result = min_in_family;
                  }
              }
          }
          return result;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << prime_digit_replacements() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler051.cpp"
    performance: "O(n^2) time complexity"
  - language: "go"
    code: |
      // https://projecteuler.net/problem=51
      //
      // Prime Digit Replacements
      //
      // By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
      // By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993.
      // Consequently 56003, being the first member of this family, is the smallest prime with this property.
      // Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
      //
      // Answer: 121313

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
      	for _, p := range primes {
      		if p < 100000 {
      			continue
      		}
      		s := fmt.Sprintf("%d", p)
      		digits := []byte(s)
      		for mask := 1; mask < (1<<len(digits))-1; mask++ {
      			family := []int{}
      			for d := 0; d < 10; d++ {
      				if d == 0 && (mask&1) != 0 {
      					continue
      				}
      				num := 0
      				for i, digit := range digits {
      					if (mask&(1<<uint(i))) != 0 {
      						num = num*10 + d
      					} else {
      						num = num*10 + int(digit-'0')
      					}
      				}
      				if isPrime(num) {
      					family = append(family, num)
      				}
      			}
      			if len(family) == 8 {
      				fmt.Println(family[0])
      				return
      			}
      		}
      	}
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler051.go"
  - language: "java"
    code: |
      /*
      Prime Digit Replacements

      By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
      By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993.
      Consequently 56003, being the first member of this family, is the smallest prime with this property.
      Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.

      Answer: 121313

      */
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      import java.util.*;

      public class Solution051 implements Solution {
        public String solve() {
          List<Integer> primes = new ArrayList<>();
          for (int i = 2; i < 1000000; i++) {
            if (Prime.isPrime(i)) primes.add(i);
          }
          for (int p : primes) {
            if (p < 100000) continue;
            String s = Integer.toString(p);
            char[] digits = s.toCharArray();
            for (int mask = 1; mask < (1 << digits.length) - 1; mask++) {
              List<Integer> family = new ArrayList<>();
              for (int d = 0; d < 10; d++) {
                if (d == 0 && (mask & 1) != 0) continue;
                int num = 0;
                for (int i = 0; i < digits.length; i++) {
                  if ((mask & (1 << i)) != 0) {
                    num = num * 10 + d;
                  } else {
                    num = num * 10 + (digits[i] - '0');
                  }
                }
                if (Prime.isPrime(num)) {
                  family.add(num);
                }
              }
              if (family.size() == 8) {
                return Integer.toString(Collections.min(family));
              }
            }
          }
          return "0";
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution051.java"
  - language: "javascript"
    code: |
      // https://projecteuler.net/problem=51
      // Prime Digit Replacements
      // By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
      // By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.
      // Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
      // The final answer to the problem is 121313.

      const generatePrimes = (limit) => {
        const sieve = new Array(limit + 1).fill(true);
        sieve[0] = sieve[1] = false;
        for (let i = 2; i * i <= limit; i++) {
          if (sieve[i]) {
            for (let j = i * i; j <= limit; j += i) {
              sieve[j] = false;
            }
          }
        }
        return sieve;
      };

      module.exports = {
        answer: () => {
          const limit = 1000000;
          const primes = generatePrimes(limit);
          for (let len = 1; len <= 6; len++) {
            for (let num = 10 ** (len - 1); num < 10 ** len; num++) {
              if (!primes[num]) continue;
              const str = num.toString();
              for (let mask = 1; mask < (1 << len); mask++) {
                const positions = [];
                for (let i = 0; i < len; i++) {
                  if (mask & (1 << i)) positions.push(i);
                }
                if (positions.length === 0) continue;
                const family = [];
                for (let d = 0; d <= 9; d++) {
                  if (positions[0] === 0 && d === 0) continue;
                  const newStr = str.split('');
                  for (const pos of positions) {
                    newStr[pos] = d.toString();
                  }
                  const newNum = parseInt(newStr.join(''));
                  if (primes[newNum]) family.push(newNum);
                }
                if (family.length === 8) {
                  return family[0];
                }
              }
            }
          }
          return 0;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution051.js"
  - language: "python"
    code: |
      # https://projecteuler.net/problem=51
      # Prime Digit Replacements
      # By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
      # By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.
      # Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
      # Answer: 121313
      def is_prime(n):
          if n < 2:
              return False
          if n == 2:
              return True
          if n % 2 == 0:
              return False
          for i in range(3, int(n**0.5) + 1, 2):
              if n % i == 0:
                  return False
          return True

      def solve():
          start = 100000
          while True:
              if is_prime(start):
                  s = str(start)
                  length = len(s)
                  for mask in range(1, 1 << length):
                      positions = [i for i in range(length) if mask & (1 << i)]
                      if not positions:
                          continue
                      count = 0
                      min_prime = float('inf')
                      for d in '0123456789':
                          if d == '0' and 0 in positions:
                              continue
                          new_s = list(s)
                          for p in positions:
                              new_s[p] = d
                          new_num = int(''.join(new_s))
                          if len(str(new_num)) == length and is_prime(new_num):
                              count += 1
                              if new_num < min_prime:
                                  min_prime = new_num
                      if count == 8:
                          return min_prime
              start += 1
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler051.py"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=51
      //
      // By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.
      // By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993.
      // Consequently 56003, being the first member of this family, is the smallest prime with this property.
      // Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.
      //
      // Answer: 121313

      pub fn prime_digit_replacements() -> u64 {
          let mut primes = generate_primes(1000000);
          primes.sort();
          for &p in &primes {
              if p < 100000 { continue; }
              let s = p.to_string();
              let digits: Vec<char> = s.chars().collect();
              for mask in 1..(1 << digits.len()) - 1 {
                  let mut family = vec![];
                  for d in 0..10 {
                      if d == 0 && (mask & 1) != 0 { continue; }
                      let mut num = 0u64;
                      for i in 0..digits.len() {
                          if (mask & (1 << i)) != 0 {
                              num = num * 10 + d as u64;
                          } else {
                              num = num * 10 + (digits[i] as u8 - b'0') as u64;
                          }
                      }
                      if is_prime(num as u32) {
                          family.push(num);
                      }
                  }
                  if family.len() == 8 {
                      return *family.iter().min().unwrap();
                  }
              }
          }
          0
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
          fn euler_051() {
              assert_eq!(prime_digit_replacements(), 121313);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler051.rs"
tags: ["euler"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Prime [digit replacement](https://grokipedia.com/page/Prime_number) explores [prime families](https://grokipedia.com/page/Prime_number) formed by substituting digits, revealing patterns in [number theory](https://grokipedia.com/page/Number_theory) like wildcard matching in base 10.

### Algorithm Analysis

Combines [Sieve of Eratosthenes](https://grokipedia.com/page/Sieve_of_Eratosthenes) for fast primality with bitmask-generated replacement patterns. Checks all possible digit subsets for 8-prime families efficiently.

### Key Insights

- 121313 is the smallest with an 8-prime family
- Avoids leading zeros in replacements
- Mask technique reduces search space dramatically

### Educational Value

Masterclass in blending combinatorial generation with prime testing. Teaches bit manipulation for pattern enumeration and why sieves are indispensable for number-theoretic programming challenges. Sparks curiosity about hidden structures in seemingly random primes.