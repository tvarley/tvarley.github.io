---
problemNumber: 95
title: Amicable chains
description: Find the smallest member of the longest amicable chain with no element exceeding one million.
difficulty: medium
date: 2024-04-12
technologies:
  - number theory
  - graph algorithms
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <vector>
      #include <algorithm>
      #include <set>

      const int MAX = 1000000;

      std::vector<int> sum_div(MAX + 1, 0);

      void compute_sum_div() {
          for (int i = 1; i <= MAX; ++i) {
              for (int j = i * 2; j <= MAX; j += i) {
                  sum_div[j] += i;
              }
          }
      }

      long long amicable_chains() {
          compute_sum_div();
          int max_length = 0;
          int min_member = MAX;
          std::vector<bool> visited(MAX + 1, false);

          for (int i = 2; i <= MAX; ++i) {
              if (visited[i] || sum_div[i] > MAX) continue;

              std::vector<int> chain;
              std::set<int> chain_set;
              int current = i;

              while (current <= MAX && sum_div[current] != current && chain_set.find(current) == chain_set.end()) {
                  chain.push_back(current);
                  chain_set.insert(current);
                  current = sum_div[current];
              }

              // Check if we found a cycle (current is already in chain)
              if (chain_set.find(current) != chain_set.end() && chain.size() > 1) {
                  // Find where the cycle starts
                  int cycle_start = -1;
                  for (int j = 0; j < (int)chain.size(); ++j) {
                      if (chain[j] == current) {
                          cycle_start = j;
                          break;
                      }
                  }
                  int cycle_length = chain.size() - cycle_start;
                  
                  if (cycle_length > max_length) {
                      max_length = cycle_length;
                      // Find smallest member in the cycle
                      int smallest = MAX;
                      for (size_t j = cycle_start; j < chain.size(); ++j) {
                          if (chain[j] < smallest) smallest = chain[j];
                          visited[chain[j]] = true;  // Mark cycle numbers as visited
                      }
                      min_member = smallest;
                  }
              }
          }

          return min_member;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler095.cpp
    performance: ~500ms
  - language: go
    code: |
      package main

      const MAX = 1000000

      var sumDiv = make([]int, MAX+1)

      func computeSumDiv() {
          for i := 1; i <= MAX; i++ {
              for j := i * 2; j <= MAX; j += i {
                  sumDiv[j] += i
              }
          }
      }

      func amicableChains() int {
          computeSumDiv()
          maxLength := 0
          minMember := MAX
          visited := make([]bool, MAX+1)

          for i := 2; i <= MAX; i++ {
              if visited[i] || sumDiv[i] > MAX {
                  continue
              }

              chain := []int{}
              chainSet := make(map[int]bool)
              current := i

              for current <= MAX && sumDiv[current] != current && !chainSet[current] {
                  chain = append(chain, current)
                  chainSet[current] = true
                  current = sumDiv[current]
              }

              if chainSet[current] && len(chain) > 1 {
                  cycleStart := -1
                  for j, val := range chain {
                      if val == current {
                          cycleStart = j
                          break
                      }
                  }
                  cycleLength := len(chain) - cycleStart
                  if cycleLength > maxLength {
                      maxLength = cycleLength
                      smallest := MAX
                      for j := cycleStart; j < len(chain); j++ {
                          if chain[j] < smallest {
                              smallest = chain[j]
                          }
                          visited[chain[j]] = true
                      }
                      minMember = smallest
                  }
              }
          }

          return minMember
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler095.go
    performance: ~500ms
  - language: java
    code: |
      import java.util.*;

      public class Euler095 {
          static final int MAX = 1000000;
          static int[] sumDiv = new int[MAX + 1];

          static void computeSumDiv() {
              for (int i = 1; i <= MAX; i++) {
                  for (int j = i * 2; j <= MAX; j += i) {
                      sumDiv[j] += i;
                  }
              }
          }

          static long amicableChains() {
              computeSumDiv();
              int maxLength = 0;
              int minMember = MAX;
              boolean[] visited = new boolean[MAX + 1];

              for (int i = 2; i <= MAX; i++) {
                  if (visited[i] || sumDiv[i] > MAX) continue;

                  List<Integer> chain = new ArrayList<>();
                  Set<Integer> chainSet = new HashSet<>();
                  int current = i;

                  while (current <= MAX && sumDiv[current] != current && !chainSet.contains(current)) {
                      chain.add(current);
                      chainSet.add(current);
                      current = sumDiv[current];
                  }

                  if (chainSet.contains(current) && chain.size() > 1) {
                      int cycleStart = -1;
                      for (int j = 0; j < chain.size(); j++) {
                          if (chain.get(j) == current) {
                              cycleStart = j;
                              break;
                          }
                      }
                      int cycleLength = chain.size() - cycleStart;
                      if (cycleLength > maxLength) {
                          maxLength = cycleLength;
                          int smallest = MAX;
                          for (int j = cycleStart; j < chain.size(); j++) {
                              if (chain.get(j) < smallest) smallest = chain.get(j);
                              visited[chain.get(j)] = true;
                          }
                          minMember = smallest;
                      }
                  }
              }

              return minMember;
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler095.java
    performance: ~500ms
  - language: javascript
    code: |
      const MAX = 1000000;

      const sum_div = new Array(MAX + 1).fill(0);

      function compute_sum_div() {
        for (let i = 1; i <= MAX; i++) {
          for (let j = i * 2; j <= MAX; j += i) {
            sum_div[j] += i;
          }
        }
      }

      function amicable_chains() {
        compute_sum_div();
        let max_length = 0;
        let min_member = MAX;
        const visited = new Array(MAX + 1).fill(false);

        for (let i = 2; i <= MAX; i++) {
          if (visited[i] || sum_div[i] > MAX) continue;

          const chain = [];
          const chain_set = new Set();
          let current = i;
          let found_cycle = false;

          while (!visited[current] && sum_div[current] <= MAX && sum_div[current] !== current) {
            visited[current] = true;
            chain.push(current);
            chain_set.add(current);
            current = sum_div[current];
            if (chain_set.has(current)) {
              found_cycle = true;
              break;
            }
          }

          if (found_cycle) {
            const cycle_start = chain.indexOf(current);
            const cycle = chain.slice(cycle_start);
            if (cycle.length > max_length) {
              max_length = cycle.length;
              min_member = Math.min(...cycle);
            }
          }
        }

        return min_member;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution095.js
    performance: ~500ms
  - language: python
    code: |
      def solve():
          limit = 1000000
          sum_div = [0] * (limit + 1)
          for i in range(1, limit + 1):
              for j in range(2*i, limit + 1, i):
                  sum_div[j] += i
          max_len = 0
          min_member = limit
          visited = [False] * (limit + 1)
          for n in range(2, limit + 1):
              if visited[n] or sum_div[n] > limit:
                  continue
              chain = []
              current = n
              while current not in chain and current <= limit and sum_div[current] != current:
                  chain.append(current)
                  visited[current] = True
                  current = sum_div[current]
              if current in chain and len(chain) > 1:
                  cycle_start = chain.index(current)
                  cycle_len = len(chain) - cycle_start
                  if cycle_len > max_len:
                      max_len = cycle_len
                      min_member = min(chain[cycle_start:])
          return min_member
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler095.py
    performance: ~2000ms
  - language: rust
    code: |
      pub fn amicable_chains() -> usize {
          const LIMIT: usize = 1_000_000;
          let mut sum_div = vec![0; LIMIT + 1];
          for i in 1..=LIMIT {
              for j in (i*2..=LIMIT).step_by(i) {
                  sum_div[j] += i;
              }
          }
          let mut visited = vec![false; LIMIT + 1];
          let mut max_len = 0;
          let mut min_member = LIMIT;
          for i in 1..=LIMIT {
              if visited[i] {
                  continue;
              }
              let mut chain = vec![];
              let mut current = i;
              while !visited[current] && current <= LIMIT && sum_div[current] <= LIMIT {
                  visited[current] = true;
                  chain.push(current);
                  current = sum_div[current];
                  if chain.contains(&current) {
                      let cycle_start = chain.iter().position(|&x| x == current).unwrap();
                      let cycle_len = chain.len() - cycle_start;
                      if cycle_len > max_len {
                          max_len = cycle_len;
                          min_member = *chain[cycle_start..].iter().min().unwrap();
                      }
                      break;
                  }
              }
          }
          min_member
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler095.rs
    performance: ~5000ms
tags:
  - number theory
  - cycles
  - chains
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Amicable chains are sequences where each number is the sum of proper divisors of the previous. A chain forms a cycle when it returns to a starting point. The problem seeks the longest such chain below 1,000,000 and its smallest member.

### Algorithm Analysis

Precompute sum of proper divisors for all numbers up to limit. Traverse chains from each unvisited number, using visited array to avoid redundancy and detecting cycles when encountering previously seen numbers in current chain.

### Performance

Varies by language: ~500ms in C++/Go/Java/JavaScript, ~2s in Python, ~5s in Rust due to different optimization levels.

### Key Insights

- Efficient divisor sum precomputation using sieve-like method
- Cycle detection prevents infinite loops and identifies valid chains
- Visited array ensures each number processed only once

### Educational Value

Demonstrates graph traversal in number theory, cycle detection algorithms, and optimization of computational number theory problems across multiple programming paradigms.