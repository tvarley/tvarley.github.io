---
problemNumber: 24
title: "Lexicographic Permutations"
description: |
  A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:

  012   021   102   120   201   210

  What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=24
      // Lexicographic permutations
      
      // A permutation is an ordered arrangement of objects. 
      // For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. 
      // If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. 
      // The lexicographic permutations of 0, 1 and 2 are:
      
      // 012   021   102   120   201   210
      
      // What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?
      
      // Answer: 2783915460
      
      #include <algorithm>
      #include <chrono>
      #include <iostream>
      #include <string>
      
      #include "simple_timer.h"
      
      std::string lexicographic_permutations_cheat(std::string input)
      {
        int perm_count = 0;
        std::string result;
        std::sort(input.begin(), input.end());
        do {
          result = input;
        } while(std::next_permutation(input.begin(), input.end()) && ++perm_count < 1000000);
      
        return result;
      }
      
      // This function finds the index of the smallest character
      // which is greater than 'first' and is present in str[l..h]
      int findCeil (char str[], char first, int l, int h)
      {
          // initialize index of ceiling element
          int ceilIndex = l;
      
          // Now iterate through rest of the elements and find
          // the smallest character greater than 'first'
          for (int i = l+1; i <= h; i++)
            if (str[i] > first && str[i] < str[ceilIndex])
              ceilIndex = i;
      
          return ceilIndex;
      }
      
      
      // @see - https://www.geeksforgeeks.org/lexicographic-permutations-of-string/
      // Following are the steps to print the permutations lexicographic-ally
      // 1. Sort the given string in non-decreasing order and print it. 
      // The first permutation is always the string sorted in non-decreasing order.
      // 2. Start generating next higher permutation. 
      // Do it until next higher permutation is not possible. 
      // If we reach a permutation where all characters are sorted in non-increasing order, 
      // then that permutation is the last permutation.
      // 
      // Steps to generate the next higher permutation:
      // 1. Take the previously printed permutation and find the rightmost character in it, 
      // which is smaller than its next character. Let us call this character as ‘first character’.
      // 2. Now find the ceiling of the ‘first character’. 
      // Ceiling is the smallest character on right of ‘first character’, 
      // which is greater than ‘first character’. Let us call the ceil character as ‘second character’.
      // 3. Swap the two characters found in above 2 steps.
      // 4. Sort the substring (in non-decreasing order) after the original index of ‘first character’.
      std::string lexicographic_permutations(const std::string& input)
      {
        std::string result = input;
        std::sort(result.begin(), result.end());
        std::cout << "Input: " << input << std::endl;
        std::cout << "Result: " << result << std::endl;
        int perm_count = 0;
        while( ++perm_count < 1000000 ) {
          std::cout << perm_count << ") Result: " << result << std::endl;
          std::string::iterator itr;
          for( itr = (result.end() - 2); itr != result.begin(); --itr ) {
            std::cout << "Itr: [" << *itr << "][" << *(itr+1) << "]" << std::endl;
            if(*itr < *(itr+1)) {
              break;
            }
          }
          if( itr == result.begin() ) {
            break;
          } else {
            std::string::iterator swapsy = itr + 1;
            for( auto itr2 = itr + 1; itr2 != result.end(); itr2++ ) {
              if( *itr2 > *itr && *itr2 < *swapsy ) {
                swapsy = itr2;
              }
            }
            
            std::cout << "Swap: " << *itr << " with " << *swapsy << std::endl;
            std::iter_swap(swapsy, itr);
            std::sort(itr+1, result.end());
            std::cout << perm_count << ") Post Result: " << result << std::endl;
          }
        }
        return result;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::string solution = "2783915460";
        // std::string digits("0123456789");
        std::string digits("0132456789");
        std::cout << "Solution: " << solution << std::endl;
      
        // ------8<---- Cheat Mode---8<-------
        {
          simple_timer x("Lexicographics permutations (cheat mode)");
          std::string cheat_answer = lexicographic_permutations_cheat(digits);
          std::cout << "Cheat mode" << std::endl;
          std::cout << "Answer: " << cheat_answer << std::endl;
          std::cout << "Correct?: " << (cheat_answer == solution ? "PASS" : "FAIL") << std::endl;
        }
        // ------8<---- Cheat Mode---8<-------
      
        // ------8<----Non Cheat Mode---8<-------
        // {
        //   std::string test_digits("012");
        //   simple_timer x("Lexicographics permutations ( non cheat mode)");
        //   std::string answer = lexicographic_permutations(digits);
        //   std::cout << "Cheat mode" << std::endl;
        //   std::cout << "Answer: " << answer << std::endl;
        //   std::cout << "Correct?: " << (answer == solution ? "PASS" : "FAIL") << std::endl;
        // }
        // ------8<----Non Cheat Mode---8<-------
      
        // std::cout << "Answer: " << lexicographic_permutations(digits) << std::endl;
      }
      #endif //#if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler024.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.util.ArrayList;
      import java.util.Arrays;
      import java.util.List;
      
      public class Solution024 implements Solution {
        public String solve() {
          List<Integer> digits = new ArrayList<>(Arrays.asList(0, 1, 2, 3, 4, 5, 6, 7, 8, 9));
          int target = 999999;
          StringBuilder result = new StringBuilder();
      
          for (int i = 9; i >= 0; i--) {
            int fact = factorial(i);
            int index = target / fact;
            result.append(digits.remove(index));
            target %= fact;
          }
      
          return result.toString();
        }
      
        private int factorial(int n) {
          int result = 1;
          for (int i = 2; i <= n; i++) {
            result *= i;
          }
          return result;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution024.java"
  - language: "javascript"
    code: |
      function factorial(n) {
        let result = 1;
        for (let i = 2; i <= n; i++) {
          result *= i;
        }
        return result;
      }
      
      module.exports = {
        answer: () => {
          const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          let target = 999999; // 0-indexed, so 1000000th is at index 999999
          let result = '';
      
          for (let i = 9; i >= 0; i--) {
            const fact = factorial(i);
            const index = Math.floor(target / fact);
            result += digits.splice(index, 1)[0];
            target %= fact;
          }
      
          return parseInt(result);
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution024.js"
  - language: "python"
    code: |
      import math
      
      
      def solve():
          """
          Lexicographic permutations
          A permutation is an ordered arrangement of objects. For example, 3124 is one possible
          permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically
          or alphabetically, we call it lexicographic order. The lexicographic permutations of
          0, 1 and 2 are: 012 021 102 120 201 210.
          What is the millionth lexicographic permutation of the digits 0-9?
          https://projecteuler.net/problem=24
          """
          digits = list(range(10))
          n = 1_000_000 - 1
          result = []
      
          for i in range(9, -1, -1):
              f = math.factorial(i)
              idx = n // f
              result.append(str(digits[idx]))
              digits.pop(idx)
              n %= f
      
          return int(''.join(result))
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler024.py"
  - language: "ruby"
    code: |
      def euler024_solution
        digits = (0..9).to_a
        target = 999_999  # 0-based index
        result = []
        (1..10).reverse_each do |i|
          fact = (1..(i - 1)).inject(1, :*) || 1
          index = target / fact
          result << digits.delete_at(index)
          target %= fact
        end
        result.join.to_i
      end
      
      puts euler024_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler024.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func factorial(n int) int {
          if n <= 1 {
              return 1
          }
          return n * factorial(n-1)
      }
      
      func main() {
          digits := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
          n := 1000000 - 1
      
          result := ""
          for len(digits) > 0 {
              f := factorial(len(digits) - 1)
              idx := n / f
              result += fmt.Sprintf("%d", digits[idx])
              digits = append(digits[:idx], digits[idx+1:]...)
              n %= f
          }
      
          fmt.Println(result)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler024.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=24
      //
      // A permutation is an ordered arrangement of objects. For example, 3124 is one possible
      // permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed
      // numerically or alphabetically, we call it lexicographic order.
      //
      // The lexicographic permutations of 0, 1 and 2 are:
      // 012   021   102   120   201   210
      //
      // What is the millionth lexicographic permutation of the digits 0-9?
      //
      // Answer: 2783915460
      
      pub fn lexicographic_permutation(mut n: usize) -> String {
          let mut digits = vec![0usize, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          let mut result = String::new();
          n -= 1; // convert to 0-indexed
          let mut factorials = vec![1usize; 10];
          for i in 1..10 {
              factorials[i] = factorials[i - 1] * i;
          }
          for i in (0..10).rev() {
              let idx = n / factorials[i];
              result.push((b'0' + digits[idx] as u8) as char);
              digits.remove(idx);
              n %= factorials[i];
          }
          result
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_024() {
              assert_eq!(lexicographic_permutation(1_000_000), "2783915460");
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler024.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem involves finding a specific [permutation](https://grokipedia.com/page/Permutation) in lexicographic (dictionary) order. There are 10! = 3,628,800 total permutations of digits 0-9, and we want the millionth one (1,000,000th) when ordered lexicographically.

The key insight is using [factorial number system](https://grokipedia.com/page/Factorial_number_system) to determine each digit position without generating all permutations. For n distinct items, there are (n-1)! permutations starting with each possible first digit.

### Algorithm Analysis

**Factorial-based approach**: 
- Start with digits [0,1,2,3,4,5,6,7,8,9] and target index 999,999 (0-based)
- For each position i from 0 to 9:
  - Calculate factorial of (9-i) to determine how many permutations start with each possible digit
  - Select the digit that corresponds to the target index range
  - Remove the selected digit and continue with remaining digits

**Example**: For position 0, 9! = 362,880 permutations start with each digit. Index 999,999 ÷ 362,880 = 2 (integer division), so we select the 3rd digit (0-based indexing: 0,1,2 → digit 2).

**Time complexity**: O(n) where n=10, essentially constant time.
**Space complexity**: O(n) for storing the digit list.

### Key Insights

- The millionth permutation is 2,783,915,460
- Factorials provide an efficient way to navigate permutation space
- No need to generate all permutations - mathematical indexing suffices
- This demonstrates the power of combinatorial mathematics in computation
- The algorithm works for any lexicographic permutation index

### Educational Value

This problem teaches:
- Permutation mathematics and factorial relationships
- Lexicographic ordering principles
- Efficient algorithms for large combinatorial spaces
- The difference between generating vs. indexing approaches
- Mathematical optimization in programming
- Working with factorials and combinatorial calculations
- When to use mathematical insight over brute force enumeration
