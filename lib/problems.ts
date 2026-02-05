export const problems = [
  // Arrays & Hash Tables
  {
    id: "two-sum",
    title: "Two Sum",
    topic: "Arrays & Hash Tables",
    description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution,
and you may not use the same element twice.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
    `,
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    topic: "Arrays & Hash Tables",
    description: `
Given an integer array nums, return true if any value appears at least twice in the array,
and return false if every element is distinct.

Example:
Input: nums = [1,2,3,1]
Output: true

Input: nums = [1,2,3,4]
Output: false
    `,
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    topic: "Arrays & Hash Tables",
    description: `
Given an array of strings strs, group the anagrams together.
You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

Example:
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
    `,
  },
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    topic: "Arrays & Hash Tables",
    description: `
Given an integer array nums and an integer k, return the k most frequent elements.
You may return the answer in any order.

Example:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
    `,
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    topic: "Arrays",
    description: `
Given an integer array nums, return an array answer such that answer[i] is equal to
the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
You must write an algorithm that runs in O(n) time and without using the division operator.

Example:
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
    `,
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray",
    topic: "Arrays & Dynamic Programming",
    description: `
Given an integer array nums, find the contiguous subarray (containing at least one number)
which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

Example:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
    `,
  },
  {
    id: "best-time-to-buy-sell",
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays & Dynamic Programming",
    description: `
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing
a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
    `,
  },
  {
    id: "three-sum",
    title: "3Sum",
    topic: "Arrays & Two Pointers",
    description: `
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that
i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example:
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
    `,
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    topic: "Arrays & Two Pointers",
    description: `
You are given an integer array height of length n. There are n vertical lines drawn such that
the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Example:
Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
In this case, the max area of water the container can contain is 49.
    `,
  },
  {
    id: "longest-consecutive",
    title: "Longest Consecutive Sequence",
    topic: "Arrays & Hash Tables",
    description: `
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
    `,
  },

  // Linked Lists
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    topic: "Linked Lists",
    description: `
Given the head of a singly linked list, reverse the list, and return the reversed list.

Example:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
    `,
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    topic: "Linked Lists",
    description: `
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing together
the nodes of the first two lists.

Return the head of the merged linked list.

Example:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
    `,
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    topic: "Linked Lists",
    description: `
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again
by continuously following the next pointer.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example:
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
    `,
  },
  {
    id: "remove-nth-node",
    title: "Remove Nth Node From End of List",
    topic: "Linked Lists",
    description: `
Given the head of a linked list, remove the nth node from the end of the list and return its head.

Example:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
    `,
  },

  // Strings
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    topic: "Strings & Sliding Window",
    description: `
Given a string s, find the length of the longest substring without repeating characters.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
    `,
  },
  {
    id: "longest-palindrome",
    title: "Longest Palindromic Substring",
    topic: "Strings",
    description: `
Given a string s, return the longest palindromic substring in s.

Example:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
    `,
  },
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    topic: "Strings & Hash Tables",
    description: `
Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

Example:
Input: s = "anagram", t = "nagaram"
Output: true
    `,
  },
  {
    id: "encode-decode-strings",
    title: "Encode and Decode Strings",
    topic: "Strings",
    description: `
Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network
and is decoded back to the original list of strings.

Implement the encode and decode methods.

Example:
Input: ["lint","code","love","you"]
Output: ["lint","code","love","you"]
    `,
  },

  // Stacks & Queues
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    topic: "Stacks",
    description: `
Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

Example:
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false
    `,
  },
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    topic: "Stacks",
    description: `
Given an array of integers temperatures represents the daily temperatures,
return an array answer such that answer[i] is the number of days you have to wait after the ith day
to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

Example:
Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]
    `,
  },
  {
    id: "largest-rectangle",
    title: "Largest Rectangle in Histogram",
    topic: "Stacks",
    description: `
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1,
return the area of the largest rectangle in the histogram.

Example:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
    `,
  },

  // Trees
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    topic: "Trees",
    description: `
Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node
down to the farthest leaf node.

Example:
Input: root = [3,9,20,null,null,15,7]
Output: 3
    `,
  },
  {
    id: "same-tree",
    title: "Same Tree",
    topic: "Trees",
    description: `
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Example:
Input: p = [1,2,3], q = [1,2,3]
Output: true
    `,
  },
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    topic: "Trees",
    description: `
Given the root of a binary tree, invert the tree, and return its root.

Example:
Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]
    `,
  },
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    topic: "Trees",
    description: `
Given the root of a binary tree, return the level order traversal of its nodes' values.
(i.e., from left to right, level by level).

Example:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
    `,
  },
  {
    id: "validate-bst",
    title: "Validate Binary Search Tree",
    topic: "Trees",
    description: `
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys less than the node's key.
- The right subtree of a node contains only nodes with keys greater than the node's key.
- Both the left and right subtrees must also be binary search trees.

Example:
Input: root = [2,1,3]
Output: true
    `,
  },
  {
    id: "lowest-common-ancestor",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    topic: "Trees",
    description: `
Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q
as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."

Example:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
    `,
  },

  // Binary Search
  {
    id: "binary-search",
    title: "Binary Search",
    topic: "Binary Search",
    description: `
Given an array of integers nums which is sorted in ascending order, and an integer target,
write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example:
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
    `,
  },
  {
    id: "search-rotated-sorted",
    title: "Search in Rotated Sorted Array",
    topic: "Binary Search",
    description: `
There is an integer array nums sorted in ascending order (with distinct values).

Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k
(1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]].

Given the array nums after the rotation and an integer target, return the index of target if it is in nums,
or -1 if it is not in nums.

You must write an algorithm with O(log n) runtime complexity.

Example:
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
    `,
  },
  {
    id: "find-min-rotated",
    title: "Find Minimum in Rotated Sorted Array",
    topic: "Binary Search",
    description: `
Suppose an array of length n sorted in ascending order is rotated between 1 and n times.
For example, the array nums = [0,1,2,4,5,6,7] might become:
- [4,5,6,7,0,1,2] if it was rotated 4 times.
- [0,1,2,4,5,6,7] if it was rotated 7 times.

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example:
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
    `,
  },

  // Dynamic Programming
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    description: `
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Example:
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
    `,
  },
  {
    id: "coin-change",
    title: "Coin Change",
    topic: "Dynamic Programming",
    description: `
You are given an integer array coins representing coins of different denominations and an integer amount
representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be
made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

Example:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
    `,
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    topic: "Dynamic Programming",
    description: `
Given an integer array nums, return the length of the longest strictly increasing subsequence.

Example:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,18], therefore the length is 4.
    `,
  },
  {
    id: "house-robber",
    title: "House Robber",
    topic: "Dynamic Programming",
    description: `
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed,
the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected
and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money
you can rob tonight without alerting the police.

Example:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
    `,
  },
  {
    id: "word-break",
    title: "Word Break",
    topic: "Dynamic Programming",
    description: `
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated
sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
    `,
  },

  // Graphs
  {
    id: "number-of-islands",
    title: "Number of Islands",
    topic: "Graphs",
    description: `
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water),
return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

Example:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
    `,
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    topic: "Graphs",
    description: `
Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.

Example:
Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
    `,
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    topic: "Graphs",
    description: `
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1.
You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi
first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.

Return true if you can finish all courses. Otherwise, return false.

Example:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible.
    `,
  },

  // Sliding Window
  {
    id: "min-window-substring",
    title: "Minimum Window Substring",
    topic: "Sliding Window",
    description: `
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that
every character in t (including duplicates) is included in the window. If there is no such substring,
return the empty string "".

The testcases will be generated such that the answer is unique.

Example:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
    `,
  },
  {
    id: "longest-repeating-character",
    title: "Longest Repeating Character Replacement",
    topic: "Sliding Window",
    description: `
You are given a string s and an integer k. You can choose any character of the string and change it to any other
uppercase English letter. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
    `,
  },
  {
    id: "permutation-in-string",
    title: "Permutation in String",
    topic: "Sliding Window",
    description: `
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

Example:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
    `,
  },

  // Greedy
  {
    id: "jump-game",
    title: "Jump Game",
    topic: "Greedy",
    description: `
You are given an integer array nums. You are initially positioned at the array's first index, and each element
in the array represents your maximum jump length at that position.

Return true if you can reach the last index, or false otherwise.

Example:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
    `,
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    topic: "Greedy",
    description: `
Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals,
and return an array of the non-overlapping intervals that cover all the intervals in the input.

Example:
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
    `,
  },
  {
    id: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    topic: "Greedy",
    description: `
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals
you need to remove to make the rest of the intervals non-overlapping.

Example:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
    `,
  },
]

