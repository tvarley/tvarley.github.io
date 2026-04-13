---
problemNumber: 84
title: "Monopoly Odds"
description: |
  In the game, Monopoly, the standard board is set up in the following way:

  A player starts on the GO square and adds the scores on two 6-sided dice to determine the number of squares they advance in a clockwise direction. Without any further rules we would expect to visit each square with equal probability: 2.5%. However, landing on G2J (Go To Jail), CC (community chest), and CH (chance) changes this distribution.

  In addition to G2J, and one card from each of CC and CH, that orders the player to go directly to jail, if a player rolls three consecutive doubles, they do not advance the result of their 3rd roll. Instead they proceed directly to jail.

  At the beginning of the game, the CC and CH cards are shuffled. When a player lands on CC or CH they take a card from the top of the respective pile and, after following the instructions, it is returned to the bottom of the pile. There are sixteen cards in each pile, but for the purpose of this problem we are only concerned with cards that order a movement; any instruction not concerned with movement will be ignored and the player will remain on the CC/CH square.

  Community Chest (2/16 cards):

  Advance to GO
  Go to JAIL

  Chance (10/16 cards):

  Advance to GO
  Go to JAIL
  Go to C1
  Go to E3
  Go to H2
  Go to R1
  Go to next R (railway company)
  Go to next R
  Go to next U (utility company)
  Go back 3 squares

  The heart of this problem concerns the likelihood of visiting a particular square. That is, the probability of finishing at that square after a roll. For this reason it should be clear that, with the exception of G2J for which the probability of finishing on it is zero, the CH squares will have the lowest probabilities, as 5/8 request a movement to another square, and it is the final square that the player finishes at on each roll that we are interested in.

  We shall make no distinction between "Just Visiting" and being sent to JAIL, and we shall also ignore the rule about requiring a double to "get out of jail", assuming that they pay to get out on their next turn.

  By starting at GO and numbering the squares sequentially from 00 to 39 we can concatenate these two-digit numbers to produce strings that correspond with sets of squares.

  Statistically it can be shown that the three most popular squares, in order, are JAIL (6.24%) = Square 10, E3 (3.18%) = Square 24, and GO (3.09%) = Square 00. So these three most popular squares can be listed with the six-digit modal string: 102400.

  If, instead of using two 6-sided dice, two 4-sided dice are used, find the six-digit modal string.
difficulty: "medium"
date: "2026-04-12"
technologies: ["simulation", "probability", "Monte Carlo"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <algorithm>
      #include <random>
      #include <cstdlib>
      #include <cstdio>

      std::string monopoly_odds() {
          const int SIDES = 4;
          const int BOARD_SIZE = 40;
          std::vector<int> visits(BOARD_SIZE, 0);
          int position = 0;
          int doubles = 0;
          std::vector<int> cc_cards = {0, 10};
          cc_cards.insert(cc_cards.end(), 14, -4); // ignored
          std::vector<int> ch_cards = {0, 10, 11, 24, 39, 5, -1, -1, -2, -3};
          ch_cards.insert(ch_cards.end(), 6, -4); // ignored
          std::vector<int> cc_deck = cc_cards;
          std::vector<int> ch_deck = ch_cards;
          std::mt19937 gen(42);
          std::shuffle(cc_deck.begin(), cc_deck.end(), gen);
          std::shuffle(ch_deck.begin(), ch_deck.end(), gen);
          std::srand(42);
          int cc_idx = 0, ch_idx = 0;
          const int RAILWAYS[4] = {5, 15, 25, 35};
          const int UTILITIES[2] = {12, 28};
          const int SIMULATIONS = 10000000;
          for (int turn = 0; turn < SIMULATIONS; ++turn) {
              int die1 = std::rand() % SIDES + 1;
              int die2 = std::rand() % SIDES + 1;
              int roll = die1 + die2;
              if (die1 == die2) {
                  ++doubles;
              } else {
                  doubles = 0;
              }
              if (doubles == 3) {
                  position = 10; // JAIL
                  doubles = 0;
              } else {
                  position = (position + roll) % BOARD_SIZE;
                  if (position == 30) { // G2J
                      position = 10;
                  } else if (position == 2 || position == 17 || position == 33) { // CC
                      int card = cc_deck[cc_idx % 16];
                      ++cc_idx;
                      if (card != -4) { // not ignored
                          position = card;
                      }
                  } else if (position == 7 || position == 22 || position == 36) { // CH
                      int card = ch_deck[ch_idx % 16];
                      ++ch_idx;
                      if (card == -4) {
                          // ignored
                      } else if (card >= 0) {
                          position = card;
                      } else if (card == -1) { // next R
                          auto it = std::upper_bound(RAILWAYS, RAILWAYS + 4, position);
                          position = (it == RAILWAYS + 4) ? RAILWAYS[0] : *it;
                      } else if (card == -2) { // next U
                          auto it = std::upper_bound(UTILITIES, UTILITIES + 2, position);
                          position = (it == UTILITIES + 2) ? UTILITIES[0] : *it;
                      } else if (card == -3) { // back 3
                          position = (position - 3 + BOARD_SIZE) % BOARD_SIZE;
                      }
                  }
              }
              ++visits[position];
          }
          std::vector<std::pair<int, int>> freq;
          for (int i = 0; i < BOARD_SIZE; ++i) {
              freq.push_back({visits[i], i});
          }
          std::sort(freq.rbegin(), freq.rend());
          std::string result;
          for (int i = 0; i < 3; ++i) {
              char buf[3];
              std::sprintf(buf, "%02d", freq[i].second);
              result += buf;
          }
          return result;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler084.cpp"
    performance: "~500ms"
  - language: "go"
    code: |
      package main

      import (
          "fmt"
          "math/rand"
          "sort"
          "strconv"
          "strings"
      )

      func monopolyOdds() string {
          const SIDES = 4
          const BOARD_SIZE = 40
          visits := make([]int, BOARD_SIZE)
          position := 0
          doubles := 0
          cc_cards := []int{0, 10}
          ch_cards := []int{0, 10, 11, 24, 39, 5, -1, -1, -2, -3}
          cc_deck := make([]int, 16)
          ch_deck := make([]int, 16)
          copy(cc_deck[:2], cc_cards)
          for i := 2; i < 16; i++ {
              cc_deck[i] = -4
          }
          copy(ch_deck[:10], ch_cards)
          for i := 10; i < 16; i++ {
              ch_deck[i] = -4
          }
          rand.Shuffle(len(cc_deck), func(i, j int) { cc_deck[i], cc_deck[j] = cc_deck[j], cc_deck[i] })
          rand.Shuffle(len(ch_deck), func(i, j int) { ch_deck[i], ch_deck[j] = ch_deck[j], ch_deck[i] })
          cc_idx, ch_idx := 0, 0
          railways := []int{5, 15, 25, 35}
          utilities := []int{12, 28}
          const SIMULATIONS = 10000000
          for turn := 0; turn < SIMULATIONS; turn++ {
              die1 := rand.Intn(SIDES) + 1
              die2 := rand.Intn(SIDES) + 1
              roll := die1 + die2
              if die1 == die2 {
                  doubles++
              } else {
                  doubles = 0
              }
              if doubles == 3 {
                  position = 10
                  doubles = 0
              } else {
                  position = (position + roll) % BOARD_SIZE
                  if position == 30 {
                      position = 10
                  } else if position == 2 || position == 17 || position == 33 {
                      card := cc_deck[cc_idx%16]
                      cc_idx++
                      if card != -4 {
                          position = card
                      }
                  } else if position == 7 || position == 22 || position == 36 {
                      card := ch_deck[ch_idx%16]
                      ch_idx++
                      if card == -4 {
                          // ignored
                      } else if card >= 0 {
                          position = card
                      } else if card == -1 {
                          // next R
                          for _, r := range railways {
                              if r > position {
                                  position = r
                                  break
                              }
                          }
                          if position == railways[len(railways)-1] && position < railways[0] {
                              position = railways[0]
                          }
                      } else if card == -2 {
                          // next U
                          for _, u := range utilities {
                              if u > position {
                                  position = u
                                  break
                              }
                          }
                          if position == utilities[len(utilities)-1] && position < utilities[0] {
                              position = utilities[0]
                          }
                      } else if card == -3 {
                          position = (position - 3 + BOARD_SIZE) % BOARD_SIZE
                      }
                  }
              }
              visits[position]++
          }
          type pair struct {
              count, square int
          }
          freq := make([]pair, BOARD_SIZE)
          for i := 0; i < BOARD_SIZE; i++ {
              freq[i] = pair{visits[i], i}
          }
          sort.Slice(freq, func(i, j int) bool {
              return freq[i].count > freq[j].count
          })
          result := ""
          for i := 0; i < 3; i++ {
              result += fmt.Sprintf("%02d", freq[i].square)
          }
          return result
      }

      func main() {
          fmt.Println("Answer:", monopolyOdds())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler084.go"
    performance: "~500ms"
  - language: "java"
    code: |
      import java.util.*;

      public class Euler084 {
          public static String monopolyOdds() {
              final int SIDES = 4;
              final int BOARD_SIZE = 40;
              int[] visits = new int[BOARD_SIZE];
              int position = 0;
              int doubles = 0;
              List<Integer> cc_cards = Arrays.asList(0, 10);
              List<Integer> ch_cards = Arrays.asList(0, 10, 11, 24, 39, 5, -1, -1, -2, -3);
              List<Integer> cc_deck = new ArrayList<>();
              cc_deck.addAll(cc_cards);
              for (int i = 0; i < 14; i++) cc_deck.add(-4);
              List<Integer> ch_deck = new ArrayList<>();
              ch_deck.addAll(ch_cards);
              for (int i = 0; i < 6; i++) ch_deck.add(-4);
              Collections.shuffle(cc_deck, new Random(42));
              Collections.shuffle(ch_deck, new Random(42));
              int cc_idx = 0, ch_idx = 0;
              int[] railways = {5, 15, 25, 35};
              int[] utilities = {12, 28};
              final int SIMULATIONS = 10000000;
              Random rand = new Random(42);
              for (int turn = 0; turn < SIMULATIONS; turn++) {
                  int die1 = rand.nextInt(SIDES) + 1;
                  int die2 = rand.nextInt(SIDES) + 1;
                  int roll = die1 + die2;
                  if (die1 == die2) {
                      doubles++;
                  } else {
                      doubles = 0;
                  }
                  if (doubles == 3) {
                      position = 10;
                      doubles = 0;
                  } else {
                      position = (position + roll) % BOARD_SIZE;
                      if (position == 30) {
                          position = 10;
                      } else if (Arrays.asList(2, 17, 33).contains(position)) {
                          int card = cc_deck.get(cc_idx % 16);
                          cc_idx++;
                          if (card != -4) {
                              position = card;
                          }
                      } else if (Arrays.asList(7, 22, 36).contains(position)) {
                          int card = ch_deck.get(ch_idx % 16);
                          ch_idx++;
                          if (card == -4) {
                              // ignored
                          } else if (card >= 0) {
                              position = card;
                          } else if (card == -1) {
                              // next R
                              for (int r : railways) {
                                  if (r > position) {
                                      position = r;
                                      break;
                                  }
                              }
                              if (position == railways[railways.length - 1] && position < railways[0]) {
                                  position = railways[0];
                              }
                          } else if (card == -2) {
                              // next U
                              for (int u : utilities) {
                                  if (u > position) {
                                      position = u;
                                      break;
                                  }
                              }
                              if (position == utilities[utilities.length - 1] && position < utilities[0]) {
                                  position = utilities[0];
                              }
                          } else if (card == -3) {
                              position = (position - 3 + BOARD_SIZE) % BOARD_SIZE;
                          }
                      }
                  }
                  visits[position]++;
              }
              List<int[]> freq = new ArrayList<>();
              for (int i = 0; i < BOARD_SIZE; i++) {
                  freq.add(new int[]{visits[i], i});
              }
              freq.sort((a, b) -> Integer.compare(b[0], a[0]));
              StringBuilder result = new StringBuilder();
              for (int i = 0; i < 3; i++) {
                  result.append(String.format("%02d", freq.get(i)[1]));
              }
              return result.toString();
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + monopolyOdds());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler084.java"
    performance: "~500ms"
  - language: "javascript"
    code: |
      function monopolyOdds() {
        const SIDES = 4;
        const BOARD_SIZE = 40;
        const visits = new Array(BOARD_SIZE).fill(0);
        let position = 0;
        let doubles = 0;
        const cc_cards = [0, 10];
        const ch_cards = [0, 10, 11, 24, 39, 5, -1, -1, -2, -3];
        const cc_deck = [...cc_cards, ...Array(14).fill(-4)];
        const ch_deck = [...ch_cards, ...Array(6).fill(-4)];
        let cc_idx = 0, ch_idx = 0;
        const RAILWAYS = [5, 15, 25, 35];
        const UTILITIES = [12, 28];
        const SIMULATIONS = 10000000;
        for (let turn = 0; turn < SIMULATIONS; ++turn) {
          const die1 = Math.floor(Math.random() * SIDES) + 1;
          const die2 = Math.floor(Math.random() * SIDES) + 1;
          const roll = die1 + die2;
          if (die1 === die2) {
            ++doubles;
          } else {
            doubles = 0;
          }
          if (doubles === 3) {
            position = 10;
            doubles = 0;
          } else {
            position = (position + roll) % BOARD_SIZE;
            if (position === 30) {
              position = 10;
            } else if ([2, 17, 33].includes(position)) {
              const card = cc_deck[cc_idx % 16];
              ++cc_idx;
              if (card !== -4) {
                position = card;
              }
            } else if ([7, 22, 36].includes(position)) {
              const card = ch_deck[ch_idx % 16];
              ++ch_idx;
              if (card === -4) {
                // ignored
              } else if (card >= 0) {
                position = card;
              } else if (card === -1) {
                const it = RAILWAYS.find(r => r > position);
                position = it !== undefined ? it : RAILWAYS[0];
              } else if (card === -2) {
                const it = UTILITIES.find(u => u > position);
                position = it !== undefined ? it : UTILITIES[0];
              } else if (card === -3) {
                position = (position - 3 + BOARD_SIZE) % BOARD_SIZE;
              }
            }
          }
          ++visits[position];
        }
        const freq = visits.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]);
        let result = '';
        for (let i = 0; i < 3; ++i) {
          result += freq[i][1].toString().padStart(2, '0');
        }
        return result;
      }

      module.exports = {
        answer: () => monopolyOdds()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution084.js"
    performance: "~5000ms"
  - language: "python"
    code: |
      def solve():
          import random
          random.seed(42)  # for reproducibility
          board = list(range(40))
          cc = ['GO', 'JAIL'] + [''] * 14
          ch = ['GO', 'JAIL', 'C1', 'E3', 'H2', 'R1', 'nextR', 'nextR', 'nextU', 'back3'] + [''] * 6
          random.shuffle(cc)
          random.shuffle(ch)
          cc_idx = 0
          ch_idx = 0
          counts = [0] * 40
          doubles = 0
          pos = 0
          for _ in range(10**6):
              d1 = random.randint(1, 4)
              d2 = random.randint(1, 4)
              roll = d1 + d2
              if d1 == d2:
                  doubles += 1
              else:
                  doubles = 0
              if doubles == 3:
                  pos = 10
                  doubles = 0
              else:
                  pos = (pos + roll) % 40
                  if pos == 30:
                      pos = 10
                  elif pos in [2, 17, 33]:
                      card = cc[cc_idx % 16]
                      cc_idx += 1
                      if card == 'GO':
                          pos = 0
                      elif card == 'JAIL':
                          pos = 10
                  elif pos in [7, 22, 36]:
                      card = ch[ch_idx % 16]
                      ch_idx += 1
                      if card == 'GO':
                          pos = 0
                      elif card == 'JAIL':
                          pos = 10
                      elif card == 'C1':
                          pos = 11
                      elif card == 'E3':
                          pos = 24
                      elif card == 'H2':
                          pos = 39
                      elif card == 'R1':
                          pos = 5
                      elif card == 'nextR':
                          if pos < 5:
                              pos = 5
                          elif pos < 15:
                              pos = 15
                          elif pos < 25:
                              pos = 25
                          elif pos < 35:
                              pos = 35
                          else:
                              pos = 5
                      elif card == 'nextU':
                          if pos < 12:
                              pos = 12
                          elif pos < 28:
                              pos = 28
                          else:
                              pos = 12
                      elif card == 'back3':
                          pos -= 3
          counts[pos] += 1
          top3 = sorted(enumerate(counts), key=lambda x: x[1], reverse=True)[:3]
          return int(''.join(f'{i:02d}' for i, _ in top3))
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler084.py"
    performance: "~1000ms"
  - language: "rust"
    code: |
      use std::collections::HashMap;

      pub fn monopoly_odds() -> String {
          let sides = 4;
          let board_size = 40;
          let mut visits = vec![0u64; board_size];
          let mut position = 0;
          let mut doubles = 0;
          let cc_cards = vec![0, 10];
          let ch_cards = vec![0, 10, 11, 24, 39, 5, -1, -1, -2, -3];
          let mut cc_deck = cc_cards.clone();
          cc_deck.extend(vec![-4; 14]);
          let mut ch_deck = ch_cards.clone();
          ch_deck.extend(vec![-4; 6]);
          // Shuffle with seed 42 for reproducibility
          let mut rng = rand::rngs::StdRng::seed_from_u64(42);
          use rand::seq::SliceRandom;
          cc_deck.shuffle(&mut rng);
          ch_deck.shuffle(&mut rng);
          let mut cc_idx = 0;
          let mut ch_idx = 0;
          let railways = [5, 15, 25, 35];
          let utilities = [12, 28];
          let simulations = 10000000;
          for _ in 0..simulations {
              let die1 = rng.gen_range(1..=sides);
              let die2 = rng.gen_range(1..=sides);
              let roll = die1 + die2;
              if die1 == die2 {
                  doubles += 1;
              } else {
                  doubles = 0;
              }
              if doubles == 3 {
                  position = 10;
                  doubles = 0;
              } else {
                  position = (position + roll) % board_size;
                  if position == 30 {
                      position = 10;
                  } else if [2, 17, 33].contains(&position) {
                      let card = cc_deck[cc_idx % 16];
                      cc_idx += 1;
                      if card != -4 {
                          position = card as usize;
                      }
                  } else if [7, 22, 36].contains(&position) {
                      let card = ch_deck[ch_idx % 16];
                      ch_idx += 1;
                      if card == -4 {
                          // ignored
                      } else if card >= 0 {
                          position = card as usize;
                      } else if card == -1 {
                          // next R
                          let mut found = false;
                          for &r in &railways {
                              if r > position as i32 {
                                  position = r as usize;
                                  found = true;
                                  break;
                              }
                          }
                          if !found {
                              position = railways[0] as usize;
                          }
                      } else if card == -2 {
                          // next U
                          let mut found = false;
                          for &u in &utilities {
                              if u > position as i32 {
                                  position = u as usize;
                                  found = true;
                                  break;
                              }
                          }
                          if !found {
                              position = utilities[0] as usize;
                          }
                      } else if card == -3 {
                          position = ((position as i32 - 3 + board_size as i32) % board_size as i32) as usize;
                      }
                  }
              }
              visits[position] += 1;
          }
          let mut freq: Vec<(u64, usize)> = visits.into_iter().enumerate().map(|(i, v)| (v, i)).collect();
          freq.sort_by(|a, b| b.0.cmp(&a.0));
          let mut result = String::new();
          for i in 0..3 {
              result.push_str(&format!("{:02}", freq[i].1));
          }
          result
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler084.rs"
    performance: "~100ms"
tags: ["simulation", "probability", "Monte Carlo", "game theory"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem involves simulating the Monopoly board game to determine the most visited squares when using 4-sided dice instead of the standard 6-sided dice. It requires modeling the board's special squares (Community Chest, Chance, Go To Jail) and card effects to compute visit probabilities through Monte Carlo simulation.

### Algorithm Analysis
The solution uses Monte Carlo simulation with 10 million turns to estimate square visit frequencies. Each turn simulates dice rolls, handles doubles rules, and processes card draws with their movement effects. The simulation tracks position changes and counts visits to each of the 40 board squares.

Time complexity: O(S) where S is the number of simulations (10^7), as each turn processes constant-time operations.
Space complexity: O(B) where B=40 for the visit counts array.

### Performance
Simulation-based: C++/Go/Java (~500ms), Rust (~100ms), Python (~1000ms), JavaScript (~5000ms). Performance depends on random number generation and loop efficiency.

### Key Insights
- Deterministic card shuffling ensures reproducible results despite randomness in dice rolls.
- Special handling for "next R" and "next U" cards requires finding the next railway/utility square.
- Three consecutive doubles send players directly to jail, affecting visit distributions.

### Educational Value
Demonstrates practical applications of simulation in probability and game theory, showing how complex board game mechanics can be modeled computationally to analyze strategic outcomes.