/* Copyright (c) Meta Platforms, Inc. and affiliates.
* All rights reserved.
*
* This source code is licensed under the license found in the
* LICENSE file in the root directory of this source tree.
*/
const lessonPlans = [{
  id: 1,
  course: 'Python', thumbnail: 'https://www.python.org/static/community_logos/python-logo-master-v3-TM-flattened.png',
  contents: [
    { module: 1, name: 'Introduction to Python' },
    { module: 2, name: 'Functions, Booleans, and Modules' },
    { module: 3, name: 'Sequences, Iteration, and String Formatting' },
    { module: 4, name: 'Dictionaries and Sets' },
    { module: 5, name: 'Exceptions' },
    { module: 6, name: 'Lambda Functions' },
    { module: 7, name: 'Object Oriented Programming' },
    { module: 8, name: 'Properties' },
    { module: 9, name: 'Iterators' },
    { module: 10, name: 'Regular Expressions' }
  ]
},
{
  id: 2,
  course: 'JavaScript', thumbnail: 'https://cdn.pixabay.com/photo/2015/04/23/17/41/javascript-736400__340.png',
  contents: [
    { module: 1, name: 'Variable Declaration' },
    { module: 2, name: 'Operators' },
    { module: 3, name: 'Control Statements' },
    { module: 4, name: 'Error Handling' },
    { module: 5, name: 'Understanding Arrays' },
    { module: 6, name: 'Function Declaration' }
  ]
},
{
  id: 3,
  course: 'C#', thumbnail: 'https://docs.microsoft.com/en-us/windows/images/csharp-logo.png',
  contents: [
    { module: 1, name: 'Getting Started with C#' },
    { module: 2, name: '.NET Framework' },
    { module: 3, name: 'Object Orientated Programming' },
    { module: 4, name: 'Variables and Data Types' },
    { module: 5, name: 'Operators' },
    { module: 6, name: 'Arrays' },
    { module: 7, name: 'Iteration' },
    { module: 8, name: 'Classes and Objects' },
    { module: 9, name: 'Collections' }
  ]
},
{
  id: 4,
  course: 'SQL', thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png',
  contents: [
    { module: 1, name: 'Introduction to SQL' },
    { module: 2, name: 'Users and Security' },
    { module: 3, name: 'Databases' },
    { module: 4, name: 'Tables' },
    { module: 5, name: 'Constraints' },
    { module: 6, name: 'Keywords' },
    { module: 7, name: 'Data Types' },
    { module: 8, name: 'Operators' }
  ]
}
]

if (exports) {
  exports.lessonPlans = lessonPlans;
}
