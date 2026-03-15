---
problemNumber: 41
title: "Pandigital Prime"
description: |
  We shall say that an $n$-digit number is pandigital if it makes use of all the digits $1$ to $n$ exactly once. For example, $2143$ is a $4$-digit pandigital and is also prime.
  
  What is the largest $n$-digit pandigital prime that exists?
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=41
      
      // We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
      
      // What is the largest n-digit pandigital prime that exists?
      
      // Answer: 7652413
      
      #include <iostream>
      #include <string>
      #include <algorithm>
      #include <cmath>
      
      long long pandigital_prime() {
          std::string digits = "1234567";
          std::sort(digits.begin(), digits.end());
          long long max_prime = 0;
          do {
              long long num = std::stoll(digits);
              bool is_prime = true;
              if (num <= 1) is_prime = false;
              else if (num == 2) is_prime = true;
              else if (num % 2 == 0) is_prime = false;
              else {
                  for (long long i = 3; i * i <= num; i += 2) {
                      if (num % i == 0) {
                          is_prime = false;
                          break;
                      }
                  }
              }
              if (is_prime) {
                  if (num > max_prime) max_prime = num;
              }
          } while (std::next_permutation(digits.begin(), digits.end()));
          return max_prime;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << pandigital_prime() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler041.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      import java.util.ArrayList;
      import java.util.List;
      
      public class Solution041 implements Solution {
        public String solve() {
          String digits = "1234567";
          List<String> perms = generatePermutations(digits);
          long max = 0;
          for (String p : perms) {
            long num = Long.parseLong(p);
            if (Prime.isPrime((int) num)) {
              if (num > max) max = num;
            }
          }
          return Long.toString(max);
        }
      
        private List<String> generatePermutations(String s) {
          List<String> result = new ArrayList<>();
          permute(s.toCharArray(), 0, result);
          return result;
        }
      
        private void permute(char[] arr, int index, List<String> result) {
          if (index == arr.length) {
            result.add(new String(arr));
            return;
          }
          for (int i = index; i < arr.length; i++) {
            swap(arr, index, i);
            permute(arr, index + 1, result);
            swap(arr, index, i);
          }
        }
      
        private void swap(char[] arr, int i, int j) {
          char temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution041.java"
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
      
      const getPermutations = (arr) => {
        if (arr.length === 0) return [[]];
        const result = [];
        for (let i = 0; i < arr.length; i++) {
          const rest = arr.slice(0, i).concat(arr.slice(i + 1));
          const perms = getPermutations(rest);
          for (const perm of perms) {
            result.push([arr[i], ...perm]);
          }
        }
        return result;
      };
      
      module.exports = {
        answer: () => {
          const digits = [7,6,5,4,3,2,1];
          const perms = getPermutations(digits);
          let maxPrime = 0;
          for (const perm of perms) {
            const num = parseInt(perm.join(''));
            if (isPrime(num)) {
              maxPrime = Math.max(maxPrime, num);
            }
          }
          return maxPrime;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution041.js"
  - language: "python"
    code: |
      def solve():
          """
          Pandigital Prime
          We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
      
          What is the largest n-digit pandigital prime that exists?
          https://projecteuler.net/problem=41
          """
          import itertools
      
          def is_prime(n):
              if n < 2:
                  return False
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      return False
              return True
      
          digits = '1234567'
          max_prime = 0
          for perm in itertools.permutations(digits):
              num = int(''.join(perm))
              if is_prime(num):
                  max_prime = max(max_prime, num)
          return max_prime
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler041.py"
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
      
      func permutations(arr []int, start int, result *[]int) {
      	if start == len(arr)-1 {
      		num := 0
      		for _, d := range arr {
      			num = num*10 + d
      		}
      		*result = append(*result, num)
      		return
      	}
      	for i := start; i < len(arr); i++ {
      		arr[start], arr[i] = arr[i], arr[start]
      		permutations(arr, start+1, result)
      		arr[start], arr[i] = arr[i], arr[start]
      	}
      }
      
      func main() {
      	maxPrime := 0
      	for n := 7; n >= 1; n-- {
      		digits := make([]int, n)
      		for i := 0; i < n; i++ {
      			digits[i] = n - i
      		}
      		var nums []int
      		permutations(digits, 0, &nums)
      		for _, num := range nums {
      			if isPrime(num) && num > maxPrime {
      				maxPrime = num
      			}
      		}
      		if maxPrime > 0 {
      			break
      		}
      	}
      	fmt.Println(maxPrime)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler041.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=41
      //
      // We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.
      //
      // What is the largest n-digit pandigital prime that exists?
      //
      // Answer: 7652413
      
      pub fn pandigital_prime() -> u64 {
          // n=7 is the largest possible, since n=8 and n=9 sums are divisible by 3
          let digits = [1,2,3,4,5,6,7];
              let mut max_prime = 0u64;
          for perm in permutations(&digits) {
              let num = to_number(&perm);
              if is_prime(num) && num > max_prime {
                  max_prime = num;
              }
          }
          max_prime
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
      
      fn permutations(arr: &[u8]) -> Vec<Vec<u8>> {
          let mut result = Vec::new();
          let mut arr = arr.to_vec();
          let len = arr.len();
          heap_permute(&mut arr, len, &mut result);
          result
      }
      
      fn heap_permute(arr: &mut [u8], n: usize, result: &mut Vec<Vec<u8>>) {
          if n == 1 {
              result.push(arr.to_vec());
              return;
          }
          for i in 0..n {
              heap_permute(arr, n - 1, result);
              if n % 2 == 1 {
                  arr.swap(0, n - 1);
              } else {
                  arr.swap(i, n - 1);
              }
          }
      }
      
      fn to_number(digits: &[u8]) -> u64 {
          let mut num = 0u64;
          for &d in digits {
              num = num * 10 + d as u64;
          }
          num
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_041() {
              assert_eq!(pandigital_prime(), 7652413);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler041.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A number is pandigital if it uses each digit from 1 to n exactly once in an n-digit number. For example, 2143 is a 4-digit pandigital number.

The problem seeks the largest n-digit pandigital prime. Since primes greater than 2 are odd, n-digit pandigital numbers with even n cannot be prime. Additionally, for n=9 and n=8, the sum of digits 1-9=45 and 1-8=36 are divisible by 3, so those numbers are divisible by 3 and cannot be prime. Thus, the maximum possible is n=7, with sum 1+2+3+4+5+6+7=28, not divisible by 3.

### Algorithm Analysis

The solution generates all permutations of digits "1,2,3,4,5,6,7", converts each to a number, and checks if it's prime. The largest prime found is the answer.

Key steps:
- Generate all 7! = 5040 permutations
- For each permutation, convert to integer and test primality
- Track the maximum prime value found

Primality testing uses trial division up to √n.

### Performance Analysis

- **Time Complexity**: O(7! × √n) where n≈7.6×10⁶, resulting in ~5,000 × 3,000 = 15 million operations. Executes in milliseconds on modern hardware.
- **Space Complexity**: O(1) excluding permutation generation space.
- **Execution Time**: Very fast (<1 second), suitable for interactive applications.
- **Scalability**: Factorial growth in permutations limits to small n; primality testing remains efficient.

### Key Insights

- The largest 7-digit pandigital prime is 7,652,413
- Only n=7 produces pandigital primes due to parity and divisibility rules
- Permutation generation is the bottleneck, but 7! is computationally feasible
- Efficient primality testing is crucial for performance

### Educational Value

This problem teaches:
- Number theory concepts: pandigital numbers, primality, and digit sum properties
- Combinatorial algorithms: generating permutations
- Optimization: understanding constraints to reduce search space
- Algorithm design: balancing brute force with mathematical insights
- Programming techniques: permutation generation and primality testing
