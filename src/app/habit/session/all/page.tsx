"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/lib/useAuth';
import Modal from 'react-modal';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Session {
  id: number;
  userId: number;
  habitId: number;
  worship: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  email: string;
  username: string;
}

interface Habit {
  id: number;
  worship: string;
  dailyQuantity: number;
  unit: string;
  reward: number;
  createdAt: string;
  updatedAt: string;
}

const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newSession, setNewSession] = useState<Partial<Session>>({
    worship: '',
    quantity: 1,
  });
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  const { user } = useAuth(); // Get the current user

  useEffect(() => {
    const fetchSessionsAndHabits = async () => {
      if (user?.email) {
        try {
          const userResponse = await axios.get<User>(`/api/users`, {
            params: { email: user.email },
          });

          const userId = userResponse.data.id;

          // Fetch sessions
          const sessionsResponse = await axios.get<Session[]>(`/api/sessions`, {
            params: { userId },
          });

          setSessions(sessionsResponse.data);

          // Fetch habits
          const habitsResponse = await axios.get<Habit[]>(`/api/habits`, {
            params: { userId },
          });

          setHabits(habitsResponse.data);
        } catch (error) {
          console.error('Failed to fetch sessions or habits:', error);
        }
      }
    };

    fetchSessionsAndHabits();
  }, [user]);

  const handleAddSession = async () => {
    if (!newSession.worship || !selectedHabitId) {
      alert('Please select a worship type and habit.');
      return;
    }

    try {
      const userResponse = await axios.get<User>(`/api/users`, {
        params: { email: user?.email },
      });

      const userId = userResponse.data.id;

      const sessionData: Omit<Session, 'id'> = {
        userId,
        habitId: selectedHabitId,
        worship: newSession.worship!,
        quantity: newSession.quantity!,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.post<Session>('/api/sessions', sessionData);

      setSessions([...sessions, response.data]);
      setShowModal(false);
    } catch (error) {
      console.error('Failed to add session:', error);
    }
  };

  const handleWorshipChange = (worship: string) => {
    setNewSession({ ...newSession, worship });
    const habit = habits.find((h) => h.worship === worship);
    setSelectedHabitId(habit ? habit.id : null);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Sessions</h1>
      <button
        className="mb-8 px-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg shadow-md transition duration-200"
        onClick={() => setShowModal(true)}
      >
        + Add Session
      </button>
  
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Add Session Modal"
        className="bg-zinc-800 p-6 rounded-lg shadow-xl max-w-lg mx-auto outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-semibold mb-4 text-white">Add New Session</h2>
        <div className="flex flex-col space-y-4">
          <select
            className="p-3 bg-zinc-700 text-white rounded-lg focus:outline-none"
            value={newSession.worship}
            onChange={(e) => setNewSession({ ...newSession, worship: e.target.value })}
          >
            <option value="">Select Worship Type</option>
            <option value="Quran">Quran</option>
            <option value="Salawat">Salawat</option>
            <option value="Nafl">Nafl</option>
            <option value="Thikr">Thikr</option>
          </select>
          <input
            type="number"
            className="p-3 bg-zinc-700 text-white rounded-lg focus:outline-none"
            value={newSession.quantity}
            onChange={(e) => setNewSession({ ...newSession, quantity: parseFloat(e.target.value) })}
            placeholder="Quantity"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg shadow-md transition duration-200"
              onClick={handleAddSession}
            >
              Add Session
            </button>
            <button
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg shadow-md transition duration-200"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
  
      <div className="w-full max-w-4xl mt-8">
        <Table className="table-auto w-full bg-zinc-800 rounded-lg shadow-lg">
          <TableCaption className="text-teal-400 mb-4">Your Worship Sessions</TableCaption>
          <TableHeader className="bg-zinc-700">
            <TableRow>
              <TableHead className="p-4 text-left">Date</TableHead>
              <TableHead className="p-4 text-left">Worship</TableHead>
              <TableHead className="p-4 text-left">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map((session) => (
              <TableRow key={session.id} className="hover:bg-zinc-700 transition duration-150">
                <TableCell className="p-4">{new Date(session.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="p-4">{session.worship}</TableCell>
                <TableCell className="p-4">{session.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}  

export default SessionsPage;
