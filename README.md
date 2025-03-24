# Conway's Game of Life

Welcome to the **Game of Life** simulation project! This repository will simulate Conway's Game of Life using Python, providing both a console-based and a graphical (GUI) visualization.

## 📖 **About the Game of Life**
The Game of Life is a zero-player game, meaning its evolution is determined by its initial state. The player interacts only to set up the initial configuration. The game follows four simple rules based on the states of neighboring cells.

### **Rules:**
1. **Underpopulation:** A live cell with fewer than 2 live neighbors dies.
2. **Survival:** A live cell with 2 or 3 live neighbors stays alive.
3. **Overpopulation:** A live cell with more than 3 live neighbors dies.
4. **Reproduction:** A dead cell with exactly 3 live neighbors becomes alive.

---

## 🛠️ **Planned Features and Goals**
This project will progress in phases to ensure step-by-step development. Below is the roadmap:

### ✅ **Phase 1: Basic Simulation (Console-Based)**
- [ ] **Grid Initialization:** Implement a 2D grid using Python lists or NumPy arrays.
- [ ] **Random Generation:** Provide an option to randomly generate the initial state.
- [ ] **State Transition:** Apply the Game of Life rules to update cell states.
- [ ] **Display:** Visualize the grid using simple console output.
- [ ] **Loop Control:** Enable step-by-step or continuous generations with user input.

### ✅ **Phase 2: Feature Expansion**
- [ ] **Custom Initial States:** Support for loading patterns like Gliders, Pulsars, and Blinkers.
- [ ] **Infinite Grid:** Implement toroidal wrapping for an infinite-like simulation.
- [ ] **State Persistence:** Allow saving and loading of simulation states using JSON.

### ✅ **Phase 3: Optimization**
- [ ] **Efficient State Update:** Optimize grid operations using NumPy or SciPy.
- [ ] **Sparse Representation:** Use sparse matrices for memory-efficient simulations.
- [ ] **Parallel Processing:** Implement multi-threading for larger simulations.

### ✅ **Phase 4: GUI Visualization**
- [ ] **Visual Rendering:** Create a graphical simulation using `pygame` or `matplotlib`.
- [ ] **Real-Time Simulation:** Add play/pause, step, and reset controls.
- [ ] **Interactive Grid:** Allow users to draw or modify cells using a mouse.
- [ ] **Visual Effects:** Use color-coding for new or old cells.

---

## 🚀 **Getting Started**
Follow these steps to set up the project locally.

### **Prerequisites**
- Python 3.13.0
- `pip` for package management

### **Installation**
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/game-of-life.git
    cd game-of-life
    ```
2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

### **Run the Simulation**
- To run the console-based version:
    ```bash
    python src/main.py
    ```
- GUI will be available in later phases.

---

## 🧪 **Testing**
Run unit tests using `pytest`:
```bash
pytest tests/
```

---

## 📦 **Contributing**
Contributions are welcome! Feel free to fork this repository and submit a pull request.

---

## 📜 **License**
This project is licensed under the MIT License. See the LICENSE file for more details.

---

Happy simulating! 🧡

