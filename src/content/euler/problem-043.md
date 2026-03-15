---
problemNumber: 43
title: "Sub-string Divisibility"
description: |
  The number, $1406357289$, is a $0$ to $9$ pandigital number because it is made up of each of the digits $0$ to $9$ in some order, but it also has a rather interesting sub-string divisibility property.

  Let $d_1$ be the $1$<sup>st</sup> digit, $d_2$ be the $2$<sup>nd</sup> digit, and so on. In this way, we note the following:

  - $d_2d_3d_4=406$ is divisible by $2$
  - $d_3d_4d_5=063$ is divisible by $3$
  - $d_4d_5d_6=635$ is divisible by $5$
  - $d_5d_6d_7=357$ is divisible by $7$
  - $d_6d_7d_8=572$ is divisible by $11$
  - $d_7d_8d_9=728$ is divisible by $13$
  - $d_8d_9d_{10}=289$ is divisible by $17$

  Find the sum of all $0$ to $9$ pandigital numbers with this property.
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <string>
      #include <algorithm>
      #include <vector>
      
      long long substring_divisibility() {
          std::string digits = "0123456789";
          std::sort(digits.begin(), digits.end());
          std::vector<int> primes = {2, 3, 5, 7, 11, 13, 17};
          long long sum = 0;
          do {
              bool valid = true;
              for (int i = 0; i < 7; i++) {
                  int num = std::stoi(digits.substr(i + 1, 3));
                  if (num % primes[i] != 0) {
                      valid = false;
                      break;
                  }
              }
              if (valid) {
                  sum += std::stoll(digits);
              }
          } while (std::next_permutation(digits.begin(), digits.end()));
          return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << substring_divisibility() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler043.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.util.ArrayList;
      import java.util.List;
      
      public class Solution043 implements Solution {
        public String solve() {
          String digits = "0123456789";
          List<String> perms = generatePermutations(digits);
          long sum = 0;
          for (String p : perms) {
            if (check(p)) {
              sum += Long.parseLong(p);
            }
          }
          return Long.toString(sum);
        }
      
        private boolean check(String s) {
          int[] divs = {2, 3, 5, 7, 11, 13, 17};
          for (int i = 0; i < 7; i++) {
            int num = Integer.parseInt(s.substring(i + 1, i + 4));
            if (num % divs[i] != 0) return false;
          }
          return true;
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
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution043.java"
  - language: "javascript"
    code: |
      const backtrack = (current, used, sum, divs) => {
        const len = current.length;
        if (len === 10) {
          const num = current[7] * 100 + current[8] * 10 + current[9];
          if (num % 17 === 0 && current[0] !== 0) sum[0] += parseInt(current.join(''));
          return;
        }
        // Check constraint if applicable (for len 4-9)
        if (len >= 4 && len < 10) {
          const num = current[len - 3] * 100 + current[len - 2] * 10 + current[len - 1];
          if (num % divs[len - 4] !== 0) return;
        }
        for (let d = 0; d <= 9; d++) {
          if (!used.has(d)) {
            used.add(d);
            current.push(d);
            backtrack(current, used, sum, divs);
            current.pop();
            used.delete(d);
          }
        }
      };
      
      module.exports = {
        answer: () => {
          const sum = [0];
          const divs = [2, 3, 5, 7, 11, 13, 17]; // for positions 3,4,5,6,7,8,9 (len-3 index)
          backtrack([], new Set(), sum, divs);
          return sum[0];
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution043.js"
  - language: "python"
    code: |
      def solve():

          import itertools
      
          def check(num_str):
              d = [int(num_str[i]) for i in range(10)]
              if d[3] % 2 != 0:
                  return False
              if (d[2] + d[3] + d[4]) % 3 != 0:
                  return False
              if d[5] not in [0, 5]:
                  return False
              if int(num_str[4:7]) % 7 != 0:
                  return False
              if int(num_str[5:8]) % 11 != 0:
                  return False
              if int(num_str[6:9]) % 13 != 0:
                  return False
              if int(num_str[7:10]) % 17 != 0:
                  return False
              return True
      
          total = 0
          for perm in itertools.permutations('0123456789'):
              num_str = ''.join(perm)
              if num_str[0] == '0':
                  continue
              if check(num_str):
                  total += int(num_str)
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler043.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "strconv"
      
      func permutations(arr []int, start int, result *[]string) {
      	if start == len(arr)-1 {
      		s := ""
      		for _, d := range arr {
      			s += strconv.Itoa(d)
      		}
      		*result = append(*result, s)
      		return
      	}
      	for i := start; i < len(arr); i++ {
      		arr[start], arr[i] = arr[i], arr[start]
      		permutations(arr, start+1, result)
      		arr[start], arr[i] = arr[i], arr[start]
      	}
      }
      
      func checkDiv(s string) bool {
      	divisors := []int{2, 3, 5, 7, 11, 13, 17}
      	for i, div := range divisors {
      		sub := s[i+1 : i+4]
      		num, _ := strconv.Atoi(sub)
      		if num%div != 0 {
      			return false
      		}
      	}
      	return true
      }
      
      func main() {
      	digits := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
      	var perms []string
      	permutations(digits, 0, &perms)
      	sum := 0
      	for _, p := range perms {
      		if p[0] != '0' && checkDiv(p) {
      			num, _ := strconv.Atoi(p)
      			sum += num
      		}
      	}
      	fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler043.go"
  - language: "rust"
    code: |
      pub fn sub_string_divisibility() -> u64 {
          let digits = [0,1,2,3,4,5,6,7,8,9];
          let mut sum = 0u64;
          for perm in permutations(&digits) {
              if check_property(&perm) {
                  sum += to_number(&perm);
              }
          }
          sum
      }
      
      fn check_property(digits: &[u8]) -> bool {
          let d2 = digits[1] as u64;
          let d3 = digits[2] as u64;
          let d4 = digits[3] as u64;
          let d5 = digits[4] as u64;
          let d6 = digits[5] as u64;
          let d7 = digits[6] as u64;
          let d8 = digits[7] as u64;
          let d9 = digits[8] as u64;
          let d10 = digits[9] as u64;
      
          (d2 * 100 + d3 * 10 + d4) % 2 == 0 &&
          (d3 * 100 + d4 * 10 + d5) % 3 == 0 &&
          (d4 * 100 + d5 * 10 + d6) % 5 == 0 &&
          (d5 * 100 + d6 * 10 + d7) % 7 == 0 &&
          (d6 * 100 + d7 * 10 + d8) % 11 == 0 &&
          (d7 * 100 + d8 * 10 + d9) % 13 == 0 &&
          (d8 * 100 + d9 * 10 + d10) % 17 == 0
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
          fn euler_043() {
              assert_eq!(sub_string_divisibility(), 16695334890);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler043.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

A pandigital number uses each digit from 0 to 9 exactly once. The problem requires finding all such numbers where specific 3-digit substrings are divisible by given primes.

The substrings and their divisors are:
- d₂d₃d₄ divisible by 2
- d₃d₄d₅ divisible by 3
- d₄d₅d₆ divisible by 5
- d₅d₆d₇ divisible by 7
- d₆d₇d₈ divisible by 11
- d₇d₈d₉ divisible by 13
- d₈d₉d₁₀ divisible by 17

### Algorithm Analysis

The solution generates all permutations of digits 0-9 and checks each against the divisibility conditions. Since 10! = 3,628,800 permutations, brute force is feasible.

For each permutation, convert to string and check seven 3-digit numbers for divisibility. Early termination in some implementations (like backtracking in JavaScript) prunes invalid branches.

### Performance Analysis

- **Time Complexity**: O(10! × 7) ≈ 25 million operations, very fast on modern hardware
- **Space Complexity**: O(1) for most implementations, O(10!) for storing all permutations in some
- **Execution Time**: <1 second typically
- **Scalability**: Fixed at 10 digits, no scaling concerns

### Key Insights

- Divisibility by 2 and 5 can be checked by last digit

- Divisibility by 3 and 9 by digit sum

- Higher primes require full number checking

- Backtracking reduces permutations significantly

- No leading zero constraint for the number itself

### Educational Value

This problem demonstrates:
- Permutation generation algorithms

- Modular arithmetic and divisibility rules

- Backtracking optimization techniques

- Performance trade-offs between memory and computation

- The intersection of combinatorics and number theory
