---
problemNumber: 62
title: "Cubic Permutations"
description: |
  The cube, $41063625$ ($345^3$), can be permuted to produce two other cubes: $56623104$ ($384^3$) and $66430125$ ($405^3$). In fact, $41063625$ is the smallest cube which has exactly three permutations of its digits which are also cube.

  Find the smallest cube for which exactly five permutations of its digits are cube.
difficulty: "medium"
date: 2026-03-24
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <climits>
      #include <vector>
      #include <unordered_map>
      #include <algorithm>
      #include <string>

      long long cubic_permutations() {
          std::unordered_map<std::string, std::vector<long long>> groups;
          for (long long n = 1; ; ++n) {
              long long cube = n * n * n;
              std::string s = std::to_string(cube);
              if (s.length() > 12) break;
              std::string key = s;
              std::sort(key.begin(), key.end());
              groups[key].push_back(cube);
          }
          long long min_cube = LLONG_MAX;
          for (const auto& pair : groups) {
              if (pair.second.size() == 5) {
                  for (long long c : pair.second) {
                      if (c < min_cube) min_cube = c;
                  }
              }
          }
          return min_cube;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << cubic_permutations() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler062.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.util.*;

      public class Solution062 implements Solution {
        public String solve() {
          Map<String, List<Long>> groups = new HashMap<>();
          for (long n = 1; ; n++) {
            long cube = n * n * n;
            String s = String.valueOf(cube);
            if (s.length() > 12) break;
            String key = s.chars()
                .sorted()
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(cube);
          }
          long minCube = Long.MAX_VALUE;
          for (List<Long> group : groups.values()) {
            if (group.size() == 5) {
              for (long c : group) {
                if (c < minCube) minCube = c;
              }
            }
          }
          return String.valueOf(minCube);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution062.java"
  - language: "javascript"
    code: |
      function cubicPermutations() {
        const groups = new Map();
        for (let n = 1n; ; n++) {
          const cube = n * n * n;
          const s = cube.toString();
          if (s.length > 12) break;
          const key = s.split('').sort().join('');
          if (!groups.has(key)) groups.set(key, []);
          groups.get(key).push(cube);
        }
        let minCube = 2n ** 64n - 1n;
        for (const group of groups.values()) {
          if (group.length === 5) {
            for (const c of group) {
              if (c < minCube) minCube = c;
            }
          }
        }
        return minCube.toString();
      }

      module.exports = {
        answer: () => cubicPermutations()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution062.js"
  - language: "python"
    code: |
      def solve():
          groups = {}
          n = 1
          while True:
              cube = n * n * n
              s = str(cube)
              if len(s) > 12:
                  break
              key = ''.join(sorted(s))
              if key not in groups:
                  groups[key] = []
              groups[key].append(cube)
              n += 1
          min_cube = float('inf')
          for group in groups.values():
              if len(group) == 5:
                  for c in group:
                      if c < min_cube:
                          min_cube = c
          return int(min_cube)
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler062.py"
  - language: "go"
    code: |
      package main

      import (
      	"fmt"
      	"sort"
      	"strconv"
      )

      func cubicPermutations() int64 {
      	groups := make(map[string][]int64)
      	for n := int64(1); ; n++ {
      		cube := n * n * n
      		s := strconv.FormatInt(cube, 10)
      		if len(s) > 12 {
      			break
      		}
      		key := s
      		runes := []rune(key)
      		sort.Slice(runes, func(i, j int) bool { return runes[i] < runes[j] })
      		key = string(runes)
      		groups[key] = append(groups[key], cube)
      	}
      	minCube := int64(1<<63 - 1)
      	for _, group := range groups {
      		if len(group) == 5 {
      			for _, c := range group {
      				if c < minCube {
      					minCube = c
      				}
      			}
      		}
      	}
      	return minCube
      }

      func main() {
      	fmt.Println(cubicPermutations())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler062.go"
  - language: "rust"
    code: |
      use std::collections::HashMap;

      pub fn cubic_permutations() -> u64 {
          let mut groups: HashMap<String, Vec<u64>> = HashMap::new();
          let mut n: u64 = 1;
          loop {
              let cube = n * n * n;
              let s = cube.to_string();
              if s.len() > 12 {
                  break;
              }
              let mut key: Vec<char> = s.chars().collect();
              key.sort();
              let key_str = key.into_iter().collect();
              groups.entry(key_str).or_insert(Vec::new()).push(cube);
              n += 1;
          }
          let mut min_cube = u64::MAX;
          for group in groups.values() {
              if group.len() == 5 {
                  for &c in group {
                      if c < min_cube {
                          min_cube = c;
                      }
                  }
              }
          }
          min_cube
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler062.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem involves finding the smallest cube whose digits can be rearranged to form exactly four other cubes.

### Algorithm Analysis

Generate cubes and group them by their sorted digit strings to find permutations that are also cubes.

### Performance Analysis

- **Time Complexity**: O(n log n) due to string sorting
- **Space Complexity**: O(n) for storing groups
- **Execution Time**: Very fast for reasonable limits
- **Scalability**: Linear with cube root of limit

### Key Insights

- Digit sorting creates canonical representation for permutations
- Grouping enables efficient lookup of cube permutations
- The solution has 12 digits

### Educational Value

This problem teaches:
- String manipulation and sorting
- Hash maps for grouping
- Permutation concepts
- Cube number generation