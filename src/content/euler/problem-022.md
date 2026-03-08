---
problemNumber: 22
title: "Names scores"
description: |
  Using names.txt, a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.

  For example, when the list is sorted into alphabetical order, COLIN, which is worth \(3 + 15 + 12 + 9 + 14 = 53\), is the 938th name in the list. So, COLIN would obtain a score of \(938 \times 53 = 49714\).

  What is the total of all the name scores in the file?
difficulty: "easy"
date: 2015-03-02
technologies: ["cpp"]
implementations:
  - language: "cpp"
    code: |
      #include <cctype>
      #include <fstream>
      #include <iostream>
      #include <map>
      #include <sstream>

      int alphabet_score(std::string name)
      {
        int score = 0;

        for(char& c : name){
          if(std::isalpha(c)){
            score += toupper(c) - 'A' + 1;
          }
        }

        return score;
      }

      int name_scores(const char* fname)
      {
        typedef std::map<std::string,int> name_coll;
        name_coll names;

        std::ifstream fin(fname);

        if(!fin.is_open()){
          std::cerr << "Failed to open file: " << fname << std::endl;
          return -1;
        }

        for(std::string line; std::getline(fin,line);){
          std::stringstream ss(line);
          std::string name;

          while (std::getline(ss,name,',')) {
            int score = alphabet_score(name);
            names[name] = score;
          }
        }

        int total_score = 0;
        int pos = 1;
        for(auto& pair : names){
          total_score += (pos * pair.second);
          pos++;
        }

        return total_score;
      }

      int main(int argc, char const *argv[]) {
        std::cout << "Answer: " << name_scores("./src/p022_names.txt") << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler022.cpp"
    performance: "O(n log n) time complexity due to map insertion and iteration"
tags: ["euler", "names", "scores"]
featured: false
showcase: true
---

## Additional Notes

This problem requires processing a large text file of names, sorting them alphabetically, and calculating scores based on letter values and position in the sorted list. The solution uses a std::map for automatic sorting and efficient lookup, reading the names from a comma-separated file.