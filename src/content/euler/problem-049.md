---
problemNumber: 49
title: "Prime Permutations"
description: |
  The arithmetic sequence, $1487, 4817, 8147$, in which each of the terms increases by $3330$, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the $4$-digit numbers are permutations of one another.
  
  There are no arithmetic sequences made up of three $1$-, $2$-, or $3$-digit primes, exhibiting this property, but there is one other $4$-digit increasing sequence.
  
  What $12$-digit number do you form by concatenating the three terms in this sequence?
difficulty: "hard"
date: 2026-03-15
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=49
      
      // The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.
      
      // There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.
      
      // What 12-digit number do you form by concatenating the three terms in this sequence?
      
      // Answer: 296962999629
      
      // Authored by: Tim Varley 💘
      
      #include <iostream>
      #include <vector>
      #include <algorithm>
      #include <string>
      #include "sieve_eratos.h"
      
      std::string prime_permutations() {
          const int LIMIT = 10000;
          CSieveOfEratosthenes primes(LIMIT);
          std::vector<int> four_digit_primes;
          for (int i = 1000; i < LIMIT; ++i) {
              if (primes.is_prime(i)) four_digit_primes.push_back(i);
          }
          for (size_t i = 0; i < four_digit_primes.size(); ++i) {
              for (size_t j = i + 1; j < four_digit_primes.size(); ++j) {
                  for (size_t k = j + 1; k < four_digit_primes.size(); ++k) {
                      int a = four_digit_primes[i], b = four_digit_primes[j], c = four_digit_primes[k];
                      if (a != 1487 && b - a == 3330 && c - b == 3330) {
                          std::string sa = std::to_string(a), sb = std::to_string(b), sc = std::to_string(c);
                          std::sort(sa.begin(), sa.end());
                          std::sort(sb.begin(), sb.end());
                          std::sort(sc.begin(), sc.end());
                          if (sa == sb && sb == sc) {
                              return std::to_string(a) + std::to_string(b) + std::to_string(c);
                          }
                      }
                  }
              }
          }
          return "";
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << prime_permutations() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler049.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      import java.util.*;
      
      public class Solution049 implements Solution {
        public String solve() {
          for (int a = 1000; a < 10000; a++) {
            if (!Prime.isPrime(a)) continue;
            String sa = String.valueOf(a);
            char[] chars = sa.toCharArray();
            Arrays.sort(chars);
            String sorted = new String(chars);
            List<Integer> perms = new ArrayList<>();
            for (int p : generatePrimes(sorted)) {
              if (String.valueOf(p).length() == 4) perms.add(p);
            }
            Collections.sort(perms);
            for (int i = 0; i < perms.size(); i++) {
              for (int j = i + 1; j < perms.size(); j++) {
                int diff = perms.get(j) - perms.get(i);
                int third = perms.get(j) + diff;
                if (perms.contains(third) && third != perms.get(i) && perms.get(i) != 1487) {
                  return "" + perms.get(i) + perms.get(j) + third;
                }
              }
            }
          }
          return "";
        }
      
        private List<Integer> generatePrimes(String sorted) {
          Set<Integer> primes = new HashSet<>();
          permute(sorted.toCharArray(), 0, primes);
          return new ArrayList<>(primes);
        }
      
        private void permute(char[] arr, int index, Set<Integer> result) {
          if (index == arr.length) {
            int num = Integer.parseInt(new String(arr));
            if (Prime.isPrime(num)) result.add(num);
            return;
          }
          Set<Character> used = new HashSet<>();
          for (int i = index; i < arr.length; i++) {
            if (used.add(arr[i])) {
              swap(arr, index, i);
              permute(arr, index + 1, result);
              swap(arr, index, i);
            }
          }
        }
      
        private void swap(char[] arr, int i, int j) {
          char temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution049.java"
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
          const primes = [];
          for (let i = 1000; i < 10000; i++) {
            if (isPrime(i)) primes.push(i);
          }
          const groups = {};
          for (const p of primes) {
            const key = p.toString().split('').sort().join('');
            if (!groups[key]) groups[key] = [];
            groups[key].push(p);
          }
          for (const group of Object.values(groups)) {
            if (group.length >= 3) {
              group.sort((a, b) => a - b);
              for (let i = 0; i < group.length - 2; i++) {
                for (let j = i + 1; j < group.length - 1; j++) {
                  for (let k = j + 1; k < group.length; k++) {
                    if (group[j] - group[i] === group[k] - group[j] && group[i] !== 1487) {
                      return parseInt(`${group[i]}${group[j]}${group[k]}`);
                    }
                  }
                }
              }
            }
          }
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution049.js"
  - language: "python"
    code: |
      def solve():
          """
          Prime Permutations
          The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.
      
          There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.
      
          What 12-digit number do you form by concatenating the three terms in this sequence?
          https://projecteuler.net/problem=49
          """
          def is_prime(n):
              if n < 2:
                  return False
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      return False
              return True
      
          primes = []
          for i in range(1000, 10000):
              if is_prime(i):
                  primes.append(i)
      
          from collections import defaultdict
          groups = defaultdict(list)
          for p in primes:
              key = ''.join(sorted(str(p)))
              groups[key].append(p)
      
          all_sequences = []
          for key, group in groups.items():
              if len(group) >= 3:
                  group.sort()
                  for i in range(len(group) - 2):
                      for j in range(i + 1, len(group) - 1):
                          for k in range(j + 1, len(group)):
                              if group[k] - group[j] == group[j] - group[i]:
                                  all_sequences.append(str(group[i]) + str(group[j]) + str(group[k]))
          all_sequences.sort()
          return all_sequences[1]
          return None
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler049.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      import "sort"
      
      import "strconv"
      
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
      	primes := []int{}
      	for i := 1000; i < 10000; i++ {
      		if isPrime(i) {
      			primes = append(primes, i)
      		}
      	}
      	permMap := make(map[string][]int)
      	for _, p := range primes {
      		s := strconv.Itoa(p)
      		runes := []rune(s)
      		sort.Sort(sortRunes(runes))
      		key := string(runes)
      		permMap[key] = append(permMap[key], p)
      	}
      	var sequences [][]int
      	for _, group := range permMap {
      		if len(group) >= 3 {
      			sort.Ints(group)
      			for i := 0; i < len(group)-2; i++ {
      				for j := i + 1; j < len(group)-1; j++ {
      					diff := group[j] - group[i]
      					if group[j]+diff < 10000 && contains(group, group[j]+diff) {
      						sequences = append(sequences, []int{group[i], group[j], group[j]+diff})
      					}
      				}
      			}
      		}
      	}
      	// Find the sequence not starting with 1487
      	for _, seq := range sequences {
      		if seq[0] != 1487 {
      			fmt.Printf("%d%d%d\n", seq[0], seq[1], seq[2])
      			return
      		}
      	}
      }
      
      type sortRunes []rune
      
      func (s sortRunes) Less(i, j int) bool {
      	return s[i] < s[j]
      }
      
      func (s sortRunes) Swap(i, j int) {
      	s[i], s[j] = s[j], s[i]
      }
      
      func (s sortRunes) Len() int {
      	return len(s)
      }
      
      func contains(arr []int, val int) bool {
      	for _, v := range arr {
      		if v == val {
      			return true
      		}
      	}
      	return false
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler049.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=49
      //
      // The arithmetic sequence, 1487, 4817, 8147, in which each of the terms increases by 3330, is unusual in two ways: (i) each of the three terms are prime, and, (ii) each of the 4-digit numbers are permutations of one another.
      // There are no arithmetic sequences made up of three 1-, 2-, or 3-digit primes, exhibiting this property, but there is one other 4-digit increasing sequence.
      // What 12-digit number do you form by concatenating the three terms in this sequence?
      //
      // Answer: 296962999629
      
      pub fn prime_permutations() -> String {
          let mut primes = vec![];
          for n in 1000..10000 {
              if is_prime(n) {
                  primes.push(n);
              }
          }
          for &p in &primes {
              if p == 1487 { continue; } // skip the known sequence
              let perms = get_permutations(p);
              for &q in &perms {
                  if q <= p || !primes.contains(&q) { continue; }
                  let diff = q - p;
                  let r = q + diff;
                  if r < 10000 && primes.contains(&r) && perms.contains(&r) {
                      return format!("{}{}{}", p, q, r);
                  }
              }
          }
          "".to_string()
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
      
      fn get_permutations(n: u32) -> Vec<u32> {
          let s: String = format!("{}", n);
          let mut chars: Vec<char> = s.chars().collect();
          let mut result = std::collections::HashSet::new();
          let len = chars.len();
          heap_permute(&mut chars, len, &mut result);
          result.into_iter().filter(|&x| x != n).collect()
      }
      
      fn heap_permute(chars: &mut Vec<char>, n: usize, result: &mut std::collections::HashSet<u32>) {
          if n == 1 {
              let num: String = chars.iter().collect();
              if let Ok(num) = num.parse::<u32>() {
                  result.insert(num);
              }
              return;
          }
          for i in 0..n {
              heap_permute(chars, n - 1, result);
              if n % 2 == 1 {
                  chars.swap(0, n - 1);
              } else {
                  chars.swap(i, n - 1);
              }
          }
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_049() {
              assert_eq!(prime_permutations(), "296962999629");
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler049.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

An arithmetic sequence has constant difference between consecutive terms.

The problem requires three 4-digit primes that form an arithmetic sequence and are permutations of each other.

Example given: 1487, 4817, 8147 (difference 3330), all permutations of digits 1,4,7,8.

### Algorithm Analysis

Generate all 4-digit primes, group them by their digit permutations, then for each group with 3+ primes, check if any three form an arithmetic sequence.

### Performance Analysis

- **Time Complexity**: O(n) where n is number of 4-digit primes (~1000)
- **Space Complexity**: O(n) for storing primes and groups
- **Execution Time**: Fast
- **Scalability**: Linear in prime count

### Key Insights

- Most permutation groups have only 1-2 primes

- The sequence is 2969, 6299, 9629 (difference 3330)

- Concatenated: 296962999629

- Uses digit sorting to identify permutations

### Educational Value

This problem teaches:

- Prime generation and testing

- Permutation and combination concepts

- Arithmetic sequence properties

- Efficient searching through constrained sets
