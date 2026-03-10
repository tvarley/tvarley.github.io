---
problemNumber: 22
title: "Names Scores"
description: "Using names.txt, a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score. For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714. What is the total of all the name scores in the file? Answer: 871198282"
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=22
      // Names scores
      
      // Using names.txt (right click and 'Save Link/Target As...'),
      // a 46K text file containing over five-thousand first names,
      // begin by sorting it into alphabetical order.
      // Then working out the alphabetical value for each name, multiply this
      // value by its alphabetical position in the list to obtain a name score.
      //
      // For example, when the list is sorted into alphabetical order,
      // COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in
      // the list. So, COLIN would obtain a score of 938 × 53 = 49714.
      //
      // What is the total of all the name scores in the file?
      
      // Answer: 871198282
      
      #include <cctype>
      #include <fstream>
      #include <iostream>
      #include <map>
      #include <sstream>
      
      // TODO: template to a non ascii version and optimize
      int alphabet_score(std::string name)
      {
        int score = 0;
      
        for( char& c : name ){
          if( std::isalpha(c)){ // Do not care about quotes
            score += toupper(c) - 'A'+1;
          }
        }
      
        return score;
      }
      
      int name_scores(const char* fname)
      {
        typedef std::map<std::string,int> name_coll;
        name_coll names;
      
        std::cout << "Opening: " << fname << std::endl;
        std::ifstream fin(fname);
      
        if( !fin.is_open()){
          std::cerr << "Failed to open file: " << fname << std::endl;
        }
      
        for( std::string line ; std::getline(fin,line);){
          std::stringstream ss(line);
          std::string name;
      
          while (std::getline(ss,name,',')) {
            int score = alphabet_score(name);
      
            // std::cout << "Name: " << name << ':' << score << std::endl;
      
            name_coll::iterator n = names.find(name);
            if( n != names.end()){
              n->second += score; // Dupe name, just count again
            }else{
              names.insert( name_coll::value_type(name,score));
            }
          }
        }
      
        int total_score = 0;
        int pos = 1;
        for( name_coll::iterator itr = names.begin(); itr != names.end() ; itr++, pos++){
            // std::cout << "Name: " << pos << ':' << itr->first << ':' << itr->second << std::endl;
            total_score += (pos*itr->second);
        }
      
        return total_score;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
        std::cout << "Answer: " << name_scores("./src/p022_names.txt") << std::endl;
      }
      #endif //#if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler022.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.io.IOException;
      import java.nio.file.Files;
      import java.nio.file.Paths;
      import java.util.Arrays;
      
      public class Solution022 implements Solution {
        public String solve() {
          String[] names;
          try {
            String raw = new String(Files.readAllBytes(Paths.get("../cpp/src/p022_names.txt")));
            names = raw.split(",");
            for (int i = 0; i < names.length; i++) {
              names[i] = names[i].replace("\"", "");
            }
          } catch (IOException e) {
            return "error: " + e.getMessage();
          }
      
          Arrays.sort(names);
      
          long totalScore = 0;
          for (int i = 0; i < names.length; i++) {
            int nameValue = 0;
            for (char c : names[i].toCharArray()) {
              nameValue += c - 'A' + 1;
            }
            totalScore += (long) nameValue * (i + 1);
          }
      
          return Long.toString(totalScore);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution022.java"
  - language: "javascript"
    code: |
      const fs = require('fs');
      const path = require('path');
      
      module.exports = {
        answer: () => {
          const dataPath = path.join(__dirname, '../../../cpp/src/p022_names.txt');
          const raw = fs.readFileSync(dataPath, 'utf8');
          const nameList = raw.split(',').map(name => name.replace(/"/g, '')).sort();
      
          let totalScore = 0;
          for (let i = 0; i < nameList.length; i++) {
            const name = nameList[i];
            let nameValue = 0;
            for (let char of name) {
              nameValue += char.charCodeAt(0) - 'A'.charCodeAt(0) + 1;
            }
            totalScore += nameValue * (i + 1);
          }
      
          return totalScore;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution022.js"
  - language: "python"
    code: |
      import os
      
      
      def solve():
          """
          Names scores
          Using names.txt, a 46K text file containing over five-thousand first names,
          begin by sorting it into alphabetical order. Then working out the alphabetical
          value for each name, multiply this value by its alphabetical position in the list
          to obtain a name score.
          For example, when the list is sorted into alphabetical order, COLIN, which is worth
          3 + 15 + 12 + 9 + 14 = 53, is the 522nd name in the list. So, COLIN would obtain
          a score of 522 × 53 = 27736.
          What is the total of all the name scores in the file?
          https://projecteuler.net/problem=22
          """
          data_path = os.path.join(os.path.dirname(__file__), '..', 'data', 'p022_names.txt')
          with open(data_path) as f:
              names = sorted(name.strip('"') for name in f.read().split(','))
      
          total = 0
          for i, name in enumerate(names, 1):
              score = sum(ord(c) - ord('A') + 1 for c in name)
              total += i * score
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler022.py"
  - language: "ruby"
    code: |
      def euler022_solution
        names = File.read('lib/p022_names.txt').gsub('"', '').split(',').sort
        total_score = 0
        names.each_with_index do |name, index|
          position = index + 1
          value = name.chars.sum { |c| c.ord - 'A'.ord + 1 }
          total_score += position * value
        end
        total_score
      end
      
      puts euler022_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler022.rb"
  - language: "go"
    code: |
      package main
      
      import (
          "bufio"
          "fmt"
          "os"
          "sort"
          "strings"
      )
      
      func nameScore(name string) int {
          score := 0
          for _, c := range name {
              score += int(c-'A') + 1
          }
          return score
      }
      
      func main() {
          f, err := os.Open("p022_names.txt")
          if err != nil {
              fmt.Fprintln(os.Stderr, "Error opening p022_names.txt:", err)
              os.Exit(1)
          }
          defer f.Close()
      
          scanner := bufio.NewScanner(f)
          scanner.Buffer(make([]byte, 1024*1024), 1024*1024)
          var names []string
          for scanner.Scan() {
              line := scanner.Text()
              for _, part := range strings.Split(line, ",") {
                  name := strings.Trim(part, "\"")
                  if name != "" {
                      names = append(names, name)
                  }
              }
          }
      
          sort.Strings(names)
      
          total := 0
          for i, name := range names {
              total += (i + 1) * nameScore(name)
          }
      
          fmt.Println(total)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler022.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=22
      //
      // Using a 46K text file containing over five-thousand first names, begin by sorting it
      // into alphabetical order. Then working out the alphabetical value for each name,
      // multiply this value by its alphabetical position in the list to obtain a name score.
      //
      // For example, when the list is sorted into alphabetical order, COLIN, which is worth
      // 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain
      // a score of 938 × 53 = 49714.
      //
      // What is the total of all the name scores in the file?
      //
      // Answer: 871198282
      
      const NAMES_DATA: &str = include_str!("../../cpp/src/p022_names.txt");
      
      pub fn names_scores() -> u64 {
          let mut names: Vec<&str> = NAMES_DATA
              .split(',')
              .map(|s| s.trim_matches('"'))
              .collect();
          names.sort_unstable();
          names
              .iter()
              .enumerate()
              .map(|(i, name)| {
                  let alpha_val: u64 = name.bytes().map(|b| (b - b'A' + 1) as u64).sum();
                  (i as u64 + 1) * alpha_val
              })
              .sum()
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_022() {
              assert_eq!(names_scores(), 871_198_282);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler022.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 22: Names Scores.

Using names.txt, a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score. For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 × 53 = 49714. What is the total of all the name scores in the file? Answer: 871198282
