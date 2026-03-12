---
problemNumber: 31
title: "Problem 31"
description: |
  In the United Kingdom the currency is made up of pound (£) and pence (p). There are eight coins in general circulation: 1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p). It is possible to make £2 in the following way: 1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p How many different ways can £2 be made using any number of coins? Answer: 73682
difficulty: "hard"
date: 2026-03-12
technologies: ["cpp", "java", "javascript", "python", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Authored by: Tim Varley 💘
      // Assisted-by: Grok Code Fast via Crush 💘 &lt;crush@charm.land&gt;
      
      #include <iostream>
      #include <vector>
      
      int coin_sums() {
          const int amount = 200;
          std::vector<int> coins = {1, 2, 5, 10, 20, 50, 100, 200};
          std::vector<long long> dp(amount + 1, 0);
          dp[0] = 1;
          for (int coin : coins) {
              for (int i = coin; i <= amount; ++i) {
                  dp[i] += dp[i - coin];
              }
          }
          return dp[amount];
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << coin_sums() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler031.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution031 implements Solution {
        public String solve() {
          int target = 200;
          int[] coins = {1, 2, 5, 10, 20, 50, 100, 200};
          long[] ways = new long[target + 1];
          ways[0] = 1;
          for (int coin : coins) {
            for (int i = coin; i <= target; i++) {
              ways[i] += ways[i - coin];
            }
          }
          return Long.toString(ways[target]);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution031.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          const coins = [1, 2, 5, 10, 20, 50, 100, 200];
          const target = 200;
          const dp = new Array(target + 1).fill(0);
          dp[0] = 1;
      
          for (const coin of coins) {
            for (let i = coin; i <= target; i++) {
              dp[i] += dp[i - coin];
            }
          }
      
          return dp[target];
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution031.js"
  - language: "python"
    code: |
      def solve():
          """
          Coin sums
          In the United Kingdom the currency is made up of pound (£) and pence (p). There are eight coins in general circulation:
          1p, 2p, 5p, 10p, 20p, 50p, £1 (100p), and £2 (200p).
          It is possible to make £2 in the following way:
          1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p
          How many different ways can £2 be made using any number of coins?
          https://projecteuler.net/problem=31
          """
          coins = [1, 2, 5, 10, 20, 50, 100, 200]
          target = 200
          dp = [0] * (target + 1)
          dp[0] = 1
          for coin in coins:
              for i in range(coin, target + 1):
                  dp[i] += dp[i - coin]
          return dp[target]
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler031.py"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func coinSums(target int) int {
      	coins := []int{1, 2, 5, 10, 20, 50, 100, 200}
      	ways := make([]int, target+1)
      	ways[0] = 1
      	for _, coin := range coins {
      		for j := coin; j <= target; j++ {
      			ways[j] += ways[j-coin]
      		}
      	}
      	return ways[target]
      }
      
      func main() {
      	fmt.Println(coinSums(200))
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler031.go"
  - language: "rust"
    code: |
      pub fn coin_sums() -> u64 {
          let coins = [1, 2, 5, 10, 20, 50, 100, 200];
          let target = 200;
          let mut ways = vec![0u64; target + 1];
          ways[0] = 1;
          for &coin in &coins {
              for i in coin..=target {
                  ways[i] += ways[i - coin];
              }
          }
          ways[target]
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_031() {
              assert_eq!(coin_sums(), 73682);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler031.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The problem involves counting the number of ways to make change for a given amount using coins of different denominations, allowing unlimited use of each coin denomination. This is a classic problem in combinatorics and dynamic programming known as the "unbounded knapsack" or "coin change" problem.

The solution can be found using the formula for the number of ways to write a number as a sum with constraints, or more practically, using dynamic programming to count combinations.

### Algorithm Analysis

The implementations use dynamic programming with the following approach:

- Create an array `ways[0..target]` where `ways[i]` represents the number of ways to make sum i
- Initialize `ways[0] = 1` (one way to make 0: using no coins)
- For each coin denomination, iterate through amounts from coin to target and add the ways to make (i - coin) to ways[i]

This ensures that the order of coin processing doesn't matter, and we count combinations rather than permutations.

### Performance Analysis

- **Time Complexity**: O(c × t) where c is the number of coin denominations (8) and t is the target amount (200), resulting in O(1600) operations. This is extremely efficient even for much larger targets.
- **Space Complexity**: O(t) for the DP array, O(200) in this case.
- **Execution Time**: Virtually instantaneous for the given constraints, suitable for real-time applications.
- **Scalability**: Linear in both the number of coins and target amount, making it highly scalable.

### Key Insights

- The dynamic programming approach counts combinations, not permutations, by processing coins in order
- The algorithm handles unlimited coin usage naturally through the nested loops
- For £2 (200p), there are 73,682 different ways, demonstrating how combinatorial explosion occurs with multiple denominations
- This problem illustrates the power of dynamic programming for counting problems with overlapping subproblems

### Educational Value

This problem teaches:
- Dynamic programming for combinatorial counting
- The difference between combinations and permutations in counting problems
- How to model real-world problems (currency) using mathematical algorithms
- The importance of efficient algorithms for seemingly simple problems
- Coin system analysis and the mathematics of change-making
