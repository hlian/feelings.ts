===============
feelings friday
===============

.. code::

   ~*- clear eyes full hearts -*~

   $ yarn test
   $ echo '[]' > feelings.txt
   $ PORT=3000 yarn exec run node.js

   We use prettier!

   $ yarn prettier-watch

   Other, less interesting notes:

   • We use fuse-box to build and link
     TypeScript.

   • This used to be a Haskell app, but GHC/
     Stack was too slow and every time I
     started development I had to spend an
     hour upgrading everything and setting
     up Emacs and have you _tried_ Tide with
     Emacs?, because it's _really_ good.

   • The database is just a text file with a
     JSON array inside. We use write-then-
     rename to atomically update the file.
     POSIX is great!
